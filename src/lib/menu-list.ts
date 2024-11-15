import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Map,
  Building,
  BriefcaseBusiness,
  UserSquareIcon,
  UserCheck,
  LucideUser,
  SquareUserRound
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          icon: SquarePen,
          submenus: [
            {
              href: "/posts",
              label: "All Posts"
            },
            {
              href: "/posts/new",
              label: "New Post"
            }
          ]
        },
        {
          href: "/areas",
          label: "Areas",
          icon: Map
        },
        {
          href: "/branches",
          label: "Branches",
          icon: Building
        },
        {
          href: "/departments",
          label: "Departments",
          icon: BriefcaseBusiness
        },
        {
          href: "/jobs",
          label: "Jobs",
          icon: SquareUserRound
        },
        
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings
        }
      ]
    }
  ];
}
