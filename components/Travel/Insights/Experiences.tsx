"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Tag, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

function PostImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  if (errored) return <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200" />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

interface Post {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  img: string;
  imageUrls: string[];
  date: string;
  readTime: string;
  featured: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDb(row: any): Post {
  const rawUrls: unknown[] = Array.isArray(row.image_urls) ? row.image_urls : [];
  const cats: unknown[] = Array.isArray(row.category) ? row.category : [];
  return {
    id: row.id ?? "",
    category: typeof cats[0] === "string" ? cats[0] : "",
    title: row.title ?? "",
    excerpt: row.subtitle ?? row.description ?? "",
    img: row.image_url ?? "",
    imageUrls: rawUrls.filter((u): u is string => typeof u === "string"),
    date: row.created_at ? new Date(row.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "",
    readTime: row.duration ?? "",
    featured: row.is_featured ?? false,
  };
}

function thumb(post: Post): string | null {
  return post.img || post.imageUrls[0] || null;
}

export default function InsightsExperiences() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    supabase
      .from("ac_listings_travel")
      .select("id, category, title, subtitle, description, image_url, image_urls, duration, is_featured, created_at")
      .eq("listing_type", "experiences")
      .not("subtitle", "is", null)
      .neq("subtitle", "")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data.map(fromDb));
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
  ];
  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);
  const featured = filtered.find((p) => p.featured) ?? filtered[0] ?? null;
  const rest = filtered.filter((p) => p !== featured);

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-6xl mx-auto py-20 md:py-24 px-6 md:px-12 2xl:px-0 flex flex-col gap-10">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] w-fit font-bold tracking-widest uppercase text-[#dd9e5e] bg-[#dd9e5e]/10 border border-[#dd9e5e]/30 px-4 py-1.5 rounded-full">
              All Posts
            </span>
            <h2 className="cursive text-4xl text-gray-900 leading-[1.05]">
              Latest <span className="text-[#dd9e5e]">Insights</span>
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-150 cursor-pointer ${
                  cat === activeCategory
                    ? "bg-[#dd9e5e] border-[#dd9e5e] text-white"
                    : "bg-gray-50 hover:bg-[#dd9e5e]/8 border-gray-200 text-gray-500 hover:border-[#dd9e5e]/25 hover:text-[#dd9e5e]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-gray-300">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm font-medium">Loading insights…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-2 text-gray-400">
            <p className="text-sm font-medium">No posts found in this category.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">

            {/* Featured post */}
            {featured && (
              <Link href={`/insights/${featured.id}`} className="group">
                <div className="relative w-full h-72 md:h-[420px] overflow-hidden rounded-2xl bg-gray-100">
                  {thumb(featured) ? (
                    <PostImage
                      src={thumb(featured) as string}
                      alt={featured.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 flex items-center gap-2 z-10">
                    <span className="flex items-center gap-1 bg-[#dd9e5e] rounded-full px-3 py-1.5">
                      <span className="text-[9px] font-bold text-white uppercase tracking-widest">
                        Featured
                      </span>
                    </span>
                    {featured.category && (
                      <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                        <Tag size={9} className="text-[#dd9e5e] shrink-0" />
                        <span className="text-[9px] font-semibold text-gray-800">
                          {featured.category}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-1.5">
                  <h2 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#dd9e5e] transition-colors duration-200 line-clamp-1">
                    {featured.title}
                  </h2>
                  <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 font-light">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-0.5">
                    <span>{featured.date}</span>
                    {featured.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {featured.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )}

            {/* Post grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link
                    key={post.id}
                    href={`/insights/${post.id}`}
                    className="group flex flex-col"
                  >
                    <div className="relative h-44 2xl:h-52 overflow-hidden rounded-2xl bg-gray-100">
                      {thumb(post) ? (
                        <PostImage
                          src={thumb(post) as string}
                          alt={post.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200" />
                      )}
                      {post.category && (
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 z-10">
                          <Tag size={9} className="text-[#dd9e5e] shrink-0" />
                          <span className="text-[9px] font-semibold text-gray-800 whitespace-nowrap">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 flex flex-col gap-1 flex-1">
                      <h3 className="text-[13px] font-bold text-gray-900 leading-snug group-hover:text-[#dd9e5e] transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed flex-1 font-light">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                        <span>{post.date}</span>
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock size={10} /> {post.readTime}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
