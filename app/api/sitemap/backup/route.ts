import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import SitemapBackup from "@/app/models/SitemapBackup";
import { verifyAdmin } from "@/lib/verifyAdmin";

const unauthorized = () =>
  NextResponse.json({ message: "Unauthorized" }, { status: 401 });

export async function GET(request: NextRequest) {
  if (!(await verifyAdmin(request))) return unauthorized();

  try {
    await connectDB();
    const backup = await SitemapBackup.findOne({}).lean();

    if (!backup) return NextResponse.json({ data: null });

    if (request.nextUrl.searchParams.get("download") === "1") {
      const safeFileName = backup.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      return new NextResponse(backup.content, {
        headers: {
          "Content-Type": "application/xml",
          "Content-Disposition": `inline; filename="${safeFileName}"`,
          "Cache-Control": "private, no-store",
        },
      });
    }

    return NextResponse.json({
      data: {
        fileName: backup.fileName,
        urlCount: backup.urlCount,
        priorityCount: backup.priorityCount,
        updatedAt: backup.updatedAt,
      },
    });
  } catch (error) {
    console.error("Sitemap backup fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch sitemap backup" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdmin(request))) return unauthorized();

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "No XML file provided" },
        { status: 400 },
      );
    }

    if (!file.name.toLowerCase().endsWith(".xml")) {
      return NextResponse.json(
        { message: "File must be .xml" },
        { status: 400 },
      );
    }

    const content = (await file.text()).replace(/^\uFEFF/, "").trim();
    if (
      !content.startsWith("<?xml") ||
      !/<urlset(?:\s|>)/i.test(content) ||
      !/<\/urlset\s*>/i.test(content)
    ) {
      return NextResponse.json(
        { message: "Invalid sitemap XML" },
        { status: 400 },
      );
    }

    const urlCount = (content.match(/<url(?:\s|>)/gi) || []).length;
    const priorityCount = (content.match(/<priority(?:\s|>)/gi) || []).length;

    await connectDB();
    await SitemapBackup.findOneAndUpdate(
      {},
      {
        content,
        fileName: file.name,
        urlCount,
        priorityCount,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    revalidatePath("/sitemap.xml");
    return NextResponse.json({ message: "Sitemap backup saved successfully" });
  } catch (error) {
    console.error("Sitemap backup upload error:", error);
    return NextResponse.json(
      { message: "Failed to save sitemap backup" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdmin(request))) return unauthorized();

  try {
    await connectDB();
    await SitemapBackup.deleteMany({});
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ message: "Sitemap backup removed" });
  } catch (error) {
    console.error("Sitemap backup delete error:", error);
    return NextResponse.json(
      { message: "Failed to remove sitemap backup" },
      { status: 500 },
    );
  }
}
