

export const adminRoutes = {
  dashboard: "/admin",

  services: "/admin/services",

  servicePillars: {
    name:"Service Pillars",
    index: "/admin/service-pillar",
    edit: (slug: string) => `/admin/service-pillar/${slug}`,
  },

  industries: {
    index: "/admin/industries",
    edit: (slug: string) => `/admin/industries/${slug}`,
  },
} as const;