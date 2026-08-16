import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;
const PUBLIC_URL = process.env.R2_PUBLIC_URL!;

export async function POST(req: NextRequest) {
  if (!BUCKET || !PUBLIC_URL || !process.env.R2_ACCOUNT_ID) {
    return NextResponse.json({ error: "R2 not configured" }, { status: 500 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const isVideo = file.type.startsWith("video/");
  const ext = isVideo ? (file.name.split(".").pop() ?? "mp4") : "webp";
  const folder = isVideo ? "hero/videos" : "hero/images";
  const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000",
    })
  );

  return NextResponse.json({ url: `${PUBLIC_URL}/${key}` });
}
