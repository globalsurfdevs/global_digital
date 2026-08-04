import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/app/models/Service";
import "@/app/models/Portfolio"
import { revalidateTag } from "next/cache";
import { verifyAdmin } from "@/lib/verifyAdmin";

// Turns "Web Development" into "web-development"
const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

// GET /api/service?page=1&limit=10
// Returns a lightweight, paginated list of services (name, slug, _id, createdAt only)
export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");

        // --- Fetch a single service by slug (full data, for the edit form) ---
        if (slug) {
            const doc = await Service.findOne(
                { "items.slug": slug },
                { "items.$": 1 }
            ).populate("items.caseStudySection.items.project", "companyName slug logo");

            const item = doc?.items?.[0];

            if (!item) {
                return NextResponse.json(
                    { message: "Service not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ data: item });
        }

        // --- Otherwise, return the paginated list ---
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const doc = await Service.findOne({}, { items: 1 });
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
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { message: "Failed to fetch services" },
            { status: 500 }
        );
    }
}

// POST /api/service
// Body: { name: string, slug?: string }
// Creates a new service item inside the single Service document's items array.
// If no Service document exists yet, one is created.
export async function POST(req: NextRequest) {
    try {
        // const isAdmin = await verifyAdmin(req);
        // if (!isAdmin) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }
        await dbConnect();

        const body = await req.json();
        const id = body?._id;
        const name = body?.name?.trim();
        const slug = body?.slug?.trim() ? slugify(body.slug) : slugify(name ?? "");

        if (!name) {
            return NextResponse.json(
                { message: "Service name is required" },
                { status: 400 }
            );
        }

        if (!slug) {
            return NextResponse.json(
                { message: "Slug is required" },
                { status: 400 }
            );
        }

        // Ensure the single Service document exists
        let serviceDoc = await Service.findOne({});
        if (!serviceDoc) {
            serviceDoc = await Service.create({ items: [] });
        }

        // ---- EDIT branch: _id present means update an existing item ----
        if (id) {
            const item = serviceDoc.items.id(id);
            if (!item) {
                return NextResponse.json(
                    { message: "Service item not found" },
                    { status: 404 }
                );
            }

            // Slug must remain unique across all OTHER items
            const slugTaken = serviceDoc.items.some(
                (i: any) => i.slug === slug && String(i._id) !== String(id)
            );
            if (slugTaken) {
                return NextResponse.json(
                    { message: "A service with this slug already exists" },
                    { status: 409 }
                );
            }

            item.name = name;
            item.slug = slug;
            await serviceDoc.save();

            revalidateTag("service")
            return NextResponse.json(
                {
                    message: "Service updated successfully",
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
        const slugTaken = serviceDoc.items.some((item: any) => item.slug === slug);
        if (slugTaken) {
            return NextResponse.json(
                { message: "A service with this slug already exists" },
                { status: 409 }
            );
        }

        serviceDoc.items.push({ name, slug });
        await serviceDoc.save();

        const createdItem = serviceDoc.items[serviceDoc.items.length - 1];

        revalidateTag("service")
        return NextResponse.json(
            {
                message: "Service created successfully",
                data: {
                    _id: createdItem._id,
                    name: createdItem.name,
                    slug: createdItem.slug,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving service:", error);
        return NextResponse.json(
            { message: "Failed to save service" },
            { status: 500 }
        );
    }
}


export async function PATCH(req: NextRequest) {
    try {
        // const isAdmin = await verifyAdmin(req);
        // if (!isAdmin) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // }
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
                { status: 400 }
            );
        }

        const updatedDoc = await Service.findOneAndUpdate(
            { "items.slug": slug },
            { $set: setPayload },
            { new: true }
        );

        const updatedItem = updatedDoc?.items?.[0];

        if (!updatedItem) {
            return NextResponse.json(
                { message: "Service not found" },
                { status: 404 }
            );
        }

        revalidateTag("service")

        return NextResponse.json({
            message: "Service updated successfully",
            data: updatedItem,
        });
    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json(
            { message: "Failed to update service" },
            { status: 500 }
        );
    }
}

