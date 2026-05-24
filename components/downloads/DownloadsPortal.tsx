"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Download, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { documentCategories, searchDocuments } from "@/lib/documents";

function formatBytes(bytes: number) {
  if (bytes === 0) return "—";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function DownloadsPortal() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") ?? "";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [product] = useState(initialProduct);

  const results = useMemo(() => searchDocuments(query, category, product || undefined), [query, category, product]);

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-text" />
        <Input
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-11"
          aria-label="Search documents"
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {documentCategories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setCategory(cat.slug)}
            className={`px-3 py-1.5 text-xs uppercase tracking-wide transition ${
              category === cat.slug
                ? "bg-brand-accent text-[#050505]"
                : "border border-brand-border text-brand-text hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-brand-text">{results.length} document{results.length !== 1 ? "s" : ""} found</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((doc) => (
          <article key={doc.slug} className="flex flex-col border border-brand-border bg-brand-panel p-5">
            <Badge variant="outline" className="w-fit">{doc.category.replace(/-/g, " ")}</Badge>
            <h3 className="mt-3 font-heading text-lg font-semibold text-white">{doc.title}</h3>
            {doc.description && <p className="mt-2 flex-1 text-sm leading-6">{doc.description}</p>}
            <div className="mt-4 flex items-center justify-between text-xs text-brand-text">
              <span>v{doc.version}</span>
              <span>{doc.releaseDate}</span>
              <span>{formatBytes(doc.fileSize)}</span>
            </div>
            <a
              href={doc.fileUrl}
              className="mt-4 inline-flex items-center justify-center gap-2 border border-brand-accent px-4 py-2 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent hover:text-[#050505]"
            >
              <Download size={14} />
              Download
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
