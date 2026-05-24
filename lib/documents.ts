import documentsData from "@/data/documents.json";

export interface DocumentRecord {
  slug: string;
  title: string;
  description?: string;
  version: string;
  releaseDate: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  category: string;
  productSlugs: string[];
  tags: string[];
}

export interface DocumentCategory {
  slug: string;
  name: string;
}

export const documentCategories: DocumentCategory[] = [
  { slug: "all", name: "All" },
  { slug: "datasheets", name: "Datasheets" },
  { slug: "installation-guides", name: "Installation Guides" },
  { slug: "user-manuals", name: "User Manuals" },
  { slug: "firmware", name: "Firmware" },
  { slug: "software", name: "Software" },
  { slug: "cad-drawings", name: "CAD Drawings" },
  { slug: "certificates", name: "Certificates" },
  { slug: "compliance", name: "Compliance" },
  { slug: "api-docs", name: "API Documentation" },
];

export const documents: DocumentRecord[] = documentsData as DocumentRecord[];

export function searchDocuments(query: string, category?: string, product?: string): DocumentRecord[] {
  let results = documents;
  if (category && category !== "all") {
    results = results.filter((d) => d.category === category);
  }
  if (product) {
    results = results.filter((d) => d.productSlugs.includes(product));
  }
  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }
  return results;
}
