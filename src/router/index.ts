import { type RouteRecordRaw, createRouter } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"
import routeSettings from "@/config/route"

const Layouts = () => import("@/layouts/index.vue")

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    },
    name: "Login"
  },
  {
    path: "/",
    // component: Layouts,
    // redirect: "/board/dashboard",
    component: () => import("@/views/navi/index.vue"),
    name: "Home"
  },
  {
    path: "/board",
    component: Layouts,
    redirect: "/board/dashboard",
    meta: {
      title: "看板",
      svgIcon: "dashboard"
    },
    children: [
      {
        path: "minikube",
        component: () => import("@/views/minikube/index.vue"),
        name: "minikube",
        meta: {
          title: "集群安装"
        }
      },
      {
        path: "summary",
        component: () => import("@/views/cluster/index.vue"),
        name: "Summary",
        meta: {
          title: "集群概览",
          affix: true
        }
      },
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "集群监控",
          affix: true
        }
      },
      {
        path: "navy",
        component: () => import("@/views/navy/index.vue"),
        name: "Navy",
        meta: {
          title: "运维导航"
        }
      }
    ]
  },
  {
    path: "/cluster",
    component: Layouts,
    meta: {
      title: "集群",
      svgIcon: "cluster"
    },
    children: [
      {
      path: "management", // 路径设为 management
      component: () => import("@/views/cluster/management/index.vue"),
      name: "ClusterManagement",
      meta: {
        title: "集群管理" // 菜单标题
      }
    },
      {
        path: "node",
        component: () => import("@/views/node/index.vue"),
        name: "Node",
        meta: {
          title: "节点"
        }
      },
      {
        path: "namespace",
        component: () => import("@/views/namespace/index.vue"),
        name: "Namespace",
        meta: {
          title: "命名空间"
        }
      }
    ]
  },

  {
    path: "/workloads",
    component: Layouts,
    redirect: "/unocss/index",
    meta: {
      title: "工作负载",
      svgIcon: "kubernetes"
    },
    children: [
      {
        path: "pods",
        component: () => import("@/views/pods/index.vue"),
        name: "pods",
        meta: {
          title: "pod"
        }
      },
      {
        path: "deployments",
        component: () => import("@/views/deployments/index.vue"),
        name: "deployments",
        meta: {
          title: "deployment"
        }
      }
    ]
  },
  {
    path: "/storage",
    component: Layouts,
    meta: {
      title: "存储",
      svgIcon: "storage"
    },
    children: [
      {
        path: "persistentvolume",
        component: () => import("@/views/persistentvolume/index.vue"),
        name: "Notice",
        meta: {
          title: "pv"
        }
      },
      {
        path: "persistentvolumeclaim",
        component: () => import("@/views/persistentvolumeclaim/index.vue"),
        name: "persistentvolume",
        meta: {
          title: "pvc"
        }
      }
    ]
  },
  {
    path: "/network",
    component: Layouts,
    meta: {
      title: "网络",
      svgIcon: "network"
    },
    children: [
      {
        path: "service",
        component: () => import("@/views/service/index.vue"),
        name: "service",
        meta: {
          title: "service"
        }
      },
      {
        path: "ingress",
        component: () => import("@/views/ingress/index.vue"),
        name: "Nav",
        meta: {
          title: "ingress"
        }
      }
    ]
  },
  {
    path: "/config",
    component: Layouts,
    name: "Table",
    meta: {
      title: "配置管理",
      svgIcon: "config"
    },
    children: [
      {
        path: "configmap",
        component: () => import("@/views/configmap/index.vue"),
        name: "ElementPlus",
        meta: {
          title: "configmap",
          keepAlive: true
        }
      },
      {
        path: "secret",
        component: () => import("@/views/secret/index.vue"),
        name: "secret",
        meta: {
          title: "secret",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/link",
    component: Layouts,
    meta: {
      title: "项目相关",

      svgIcon: "docs"
    },
    children: [
      {
        path: "https://cilikube.cillian.website",
        component: () => {},
        name: "Link1",
        meta: {
          title: "中文文档"
        }
      },
      {
        path: "https://www.cillian.website",
        component: () => {},
        name: "Link2",
        meta: {
          title: "我的博客"
        }
      },
      {
        path: "techstack",
        component: () => import("@/views/techstack/index.vue"),
        name: "技术栈",
        meta: {
          title: "技术栈"
        }
      }
    ]
  },
  {
    path: "/permission",
    component: Layouts,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限",
      svgIcon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "页面级",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "按钮级" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  }
  // {
  //   path: "/table",
  //   component: Layouts,
  //   redirect: "/table/element-plus",
  //   name: "Table",
  //   meta: {
  //     title: "表格",
  //     elIcon: "Grid"
  //   },
  //   children: [
  //     {
  //       path: "element-plus",
  //       component: () => import("@/views/table/element-plus/index.vue"),
  //       name: "ElementPlus",
  //       meta: {
  //         title: "Element Plus",
  //         keepAlive: true
  //       }
  //     },
  //     {
  //       path: "vxe-table",
  //       component: () => import("@/views/table/vxe-table/index.vue"),
  //       name: "VxeTable",
  //       meta: {
  //         title: "Vxe Table",
  //         keepAlive: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/menu",
  //   component: Layouts,
  //   redirect: "/menu/menu1",
  //   name: "Menu",
  //   meta: {
  //     title: "多级路由",
  //     svgIcon: "menu"
  //   },
  //   children: [
  //     {
  //       path: "menu1",
  //       component: () => import("@/views/menu/menu1/index.vue"),
  //       redirect: "/menu/menu1/menu1-1",
  //       name: "Menu1",
  //       meta: {
  //         title: "menu1"
  //       },
  //       children: [
  //         {
  //           path: "menu1-1",
  //           component: () => import("@/views/menu/menu1/menu1-1/index.vue"),
  //           name: "Menu1-1",
  //           meta: {
  //             title: "menu1-1",
  //             keepAlive: true
  //           }
  //         },
  //         {
  //           path: "menu1-2",
  //           component: () => import("@/views/menu/menu1/menu1-2/index.vue"),
  //           redirect: "/menu/menu1/menu1-2/menu1-2-1",
  //           name: "Menu1-2",
  //           meta: {
  //             title: "menu1-2"
  //           },
  //           children: [
  //             {
  //               path: "menu1-2-1",
  //               component: () => import("@/views/menu/menu1/menu1-2/menu1-2-1/index.vue"),
  //               name: "Menu1-2-1",
  //               meta: {
  //                 title: "menu1-2-1",
  //                 keepAlive: true
  //               }
  //             },
  //             {
  //               path: "menu1-2-2",
  //               component: () => import("@/views/menu/menu1/menu1-2/menu1-2-2/index.vue"),
  //               name: "Menu1-2-2",
  //               meta: {
  //                 title: "menu1-2-2",
  //                 keepAlive: true
  //               }
  //             }
  //           ]
  //         },
  //         {
  //           path: "menu1-3",
  //           component: () => import("@/views/menu/menu1/menu1-3/index.vue"),
  //           name: "Menu1-3",
  //           meta: {
  //             title: "menu1-3",
  //             keepAlive: true
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: "menu2",
  //       component: () => import("@/views/menu/menu2/index.vue"),
  //       name: "Menu2",
  //       meta: {
  //         title: "menu2",
  //         keepAlive: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/hook-demo",
  //   component: Layouts,
  //   redirect: "/hook-demo/use-fetch-select",
  //   name: "HookDemo",
  //   meta: {
  //     title: "Hook",
  //     elIcon: "Menu",
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: "use-fetch-select",
  //       component: () => import("@/views/hook-demo/use-fetch-select.vue"),
  //       name: "UseFetchSelect",
  //       meta: {
  //         title: "useFetchSelect"
  //       }
  //     },
  //     {
  //       path: "use-fullscreen-loading",
  //       component: () => import("@/views/hook-demo/use-fullscreen-loading.vue"),
  //       name: "UseFullscreenLoading",
  //       meta: {
  //         title: "useFullscreenLoading"
  //       }
  //     },
  //     {
  //       path: "use-watermark",
  //       component: () => import("@/views/hook-demo/use-watermark.vue"),
  //       name: "UseWatermark",
  //       meta: {
  //         title: "useWatermark"
  //       }
  //     }
  //   ]
  // }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const dynamicRoutes: RouteRecordRaw[] = []

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}
// 抛出路由实例, 在 main.js 中引用
export default router
