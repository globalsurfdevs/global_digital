import Industries from "@/app/models/Industries";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/mongodb'
import { verifyAdmin } from "@/lib/verifyAdmin";
import { getToken } from "next-auth/jwt";

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");


export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");

        // --- Fetch a single service by slug (full data, for the edit form) ---
        if (slug) {
            const doc = await Industries.findOne(
                { "items.slug": slug },
                { "items.$": 1 },
            )

            const item = doc?.items?.[0];

            if (!item) {
                return NextResponse.json(
                    { message: "Service not found" },
                    { status: 404 },
                );
            }

            return NextResponse.json({ data: item });
        }

        // --- Otherwise, return the paginated list ---
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const doc = await Industries.findOne({}, { items: 1 });
        const allItems = doc?.items ?? [];

        const totalItems = allItems.length;
        const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

        const paginatedItems = allItems
            .slice(skip, skip + limit)
            .map((item: any) => ({
                _id: item._id,
                name: item.name,
                slug: item.slug,
                createdAt: item.createdAt,
            }));

        return NextResponse.json({
            data: paginatedItems,
            totalPages,
            totalItems,
        });
    } catch (error) {
        console.error("Error fetching industries:", error);
        return NextResponse.json(
            { message: "Failed to fetch industries" },
            { status: 500 },
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await dbConnect();

        const body = await req.json();
        const id = body?._id;
        const name = body?.name?.trim();
        const slug = body?.slug?.trim() ? slugify(body.slug) : slugify(name ?? "");

        if (!name) {
            return NextResponse.json(
                { message: "Industry name is required" },
                { status: 400 }
            );
        }

        if (!slug) {
            return NextResponse.json(
                { message: "Slug is required" },
                { status: 400 }
            );
        }

        // Ensure the single Industry document exists
        let industryDoc = await Industries.findOne({});
        if (!industryDoc) {
            industryDoc = await Industries.create({ items: [] });
        }

        // ---- EDIT branch: _id present means update an existing item ----
        if (id) {
            const item = industryDoc.items.id(id);
            if (!item) {
                return NextResponse.json(
                    { message: "Industry item not found" },
                    { status: 404 }
                );
            }

            // Slug must remain unique across all OTHER items
            const slugTaken = industryDoc.items.some(
                (i: any) => i.slug === slug && String(i._id) !== String(id)
            );
            if (slugTaken) {
                return NextResponse.json(
                    { message: "A industry with this slug already exists" },
                    { status: 409 }
                );
            }

            item.name = name;
            item.slug = slug;
            await industryDoc.save();

            revalidateTag("industry")
            return NextResponse.json(
                {
                    message: "Industry updated successfully",
                    data: {
                        _id: item._id,
                        name: item.name,
                        slug: item.slug,
                    },
                },
                { status: 200 }
            );
        }

        // ---- CREATE branch: no _id means create a new item ----
        const slugTaken = industryDoc.items.some((item: any) => item.slug === slug);
        if (slugTaken) {
            return NextResponse.json(
                { message: "A industry with this slug already exists" },
                { status: 409 }
            );
        }

        industryDoc.items.push({ name, slug });
        await industryDoc.save();

        const createdItem = industryDoc.items[industryDoc.items.length - 1];

        revalidateTag("industry")
        return NextResponse.json(
            {
                message: "Industry created successfully",
                data: {
                    _id: createdItem._id,
                    name: createdItem.name,
                    slug: createdItem.slug,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving industry:", error);
        return NextResponse.json(
            { message: "Failed to save industry" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(req);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");
        // const slug = "branding-and-positioning-agency-in-dubai"
        const body = await req.json();

        // Never let the request body overwrite the slug that identifies this item —
        // slug changes should go through a dedicated rename flow, not a general PATCH.
        const { slug: _ignoredSlug, ...updateData } = body ?? {};

        // Build a $set payload like { "items.$.seo": ..., "items.$.firstSection": ..., ... }
        const setPayload: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(updateData)) {
            setPayload[`items.$.${key}`] = value;
        }

        if (Object.keys(setPayload).length === 0) {
            return NextResponse.json(
                { message: "No data provided to update" },
                { status: 400 },
            );
        }

        const updatedDoc = await Industries.findOneAndUpdate(
            { "items.slug": slug },
            { $set: setPayload },
            { new: true },
        );

        const updatedItem = updatedDoc?.items?.[0];

        if (!updatedItem) {
            return NextResponse.json(
                { message: "Industry not found" },
                { status: 404 },
            );
        }

        revalidateTag("industry");

        return NextResponse.json({
            message: "Industry updated successfully",
            data: updatedItem,
        });
    } catch (error) {
        console.error("Error updating industry:", error);
        return NextResponse.json(
            { message: "Failed to update industry" },
            { status: 500 },
        );
    }
}