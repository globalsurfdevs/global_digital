
export const userRoutes = {
  home: "/",
  services: "/services",

  servicePillar: {
    index: "/",
    detail: (slug: string) => `/${slug}`,
  },

  industries: {
    index: "/industries",
    detail: (slug: string) => `/industries/${slug}`,
  },
} as const;