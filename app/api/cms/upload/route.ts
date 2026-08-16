import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const form    = await req.formData();
    const file    = form.get("file") as File | null;
    const folder  = (form.get("folder") as string) ?? "cms";
    const company = (form.get("company") as string) ?? "default";

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const buf  = Buffer.from(await file.arrayBuffer());
    const ext  = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const slug = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const key  = `${folder}/${company}/${slug}.${ext}`;

    await r2.send(new PutObjectCommand({
      Bucket:      process.env.R2_BUCKET_NAME!,
      Key:         key,
      Body:        buf,
      ContentType: file.type,
    }));

    return NextResponse.json({ url: `${process.env.R2_PUBLIC_URL}/${key}` });
  } catch (err) {
    console.error("[cms/upload]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
