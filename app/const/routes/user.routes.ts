
export const userRoutes = {
  home: "/",
  services: "/services",

  servicePillar: {
    index: "/service-pillar",
    detail: (slug: string) => `/service-pillar/${slug}`,
  },

  industries: {
    index: "/industries",
    detail: (slug: string) => `/industries/${slug}`,
  },
} as const;