// tagTypes: ['Blog', 'BlogList', 'BlogStats', 'Tags'],
export const BLOG_API_TAGS = {
  BLOG: "Blog",
  BLOG_LIST: "BlogList",
  BLOG_STATS: "BlogStats",
  TAGS: "Tags",
};

const BLOGS_BASE_API = "/api/blogs";

export const BLOGS_API_PATHS = {
  BASE: BLOGS_BASE_API,
  BY_ID: (blogId: string) => `${BLOGS_BASE_API}/${blogId}`,
} as const;
