// src/types/blog.types.ts
export interface BlogPost {
  _id: string;
  slug: string;
  seo: SEOMetadata;
  content: BlogContent;
  status: "draft" | "published" | "archived";
  author: {
    _id: string;
    name: string;
    email: string;
  };
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
    image?: string;
  };
}

export interface BlogContent {
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  leadParagraph: string;
  body: string;
  featuredImage?: File | string | null;
}

export interface CreateBlogInput {
  slug?: string;
  seo: SEOMetadata;
  content: BlogContent;
  status?: "draft" | "published" | "archived";
}

export interface IBlogsResponse {
  success: boolean;
  message: string;
  data: {
    blogs: BlogPost[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export interface IGetBlogsParams {
  page?: number;
  limit?: number;
  status?: "draft" | "published" | "archived"; // Example enum/union type
  tags?: string; // Should be a comma-separated string if passed directly
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}
