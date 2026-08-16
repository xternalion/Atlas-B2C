import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED  = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 2 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  if (!ALLOWED.includes(file.type))
    return NextResponse.json({ error: "Only JPG, PNG, WebP or GIF allowed" }, { status: 400 });
  if (file.size > MAX_BYTES)
    return NextResponse.json({ error: "Max file size is 2 MB" }, { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());

  await r2.send(new PutObjectCommand({
    Bucket:      process.env.R2_BUCKET_NAME!,
    Key:         key,
    Body:        buf,
    ContentType: file.type,
  }));

  return NextResponse.json({ url: `${process.env.R2_PUBLIC_URL}/${key}` });
}
