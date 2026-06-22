import {
  AppWindow,
  CalendarDays,
  CircleUser,
  History,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Stars,
  VideoIcon,
  type LucideIcon,
} from "lucide-react";

export interface MenuItemsType {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItemsForUser: MenuItemsType[] = [
  {
    label: "Home",
    href: "/dashboard/user", // The parent path
    icon: LayoutDashboard,
  },
  {
    label: "Certificate", // or Certificates
    href: "/dashboard/user/certificates", // Keep the full path here so location.pathname matches
    icon: History,
  },
  {
    label: "Talent Portal",
    href: "/dashboard/user/talent-portal", // Updated to reflect nesting
    icon: ShoppingBag,
  },
  {
    label: "Settings",
    href: "/dashboard/user/settings", // Updated to reflect nesting
    icon: Settings,
  },
];
export const navItemsForExperts: MenuItemsType[] = [
  {
    label: "Overview",
    href: "/dashboard/experts/overview",
    icon: AppWindow,
  },
  {
    label: "Availability",
    href: "/dashboard/experts/availability",
    icon: CalendarDays,
  },
  {
    label: "Profile",
    href: "/dashboard/experts/profile",
    icon: CircleUser,
  },
  {
    label: "Reviews",
    href: "/dashboard/experts/Reviews",
    icon: Stars,
  },
  {
    label: "Settings",
    href: "/dashboard/experts/settings",
    icon: Settings,
  },
  {
    label: "My Sessions",
    href: "/dashboard/experts/consultation",
    icon: VideoIcon,
  },
];
