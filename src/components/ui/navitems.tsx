import {
  History,
  LayoutDashboard,
  ShoppingBag,
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
];
export const navItemsForExperts: MenuItemsType[] = [
  {
    label: "Homesss",
    href: "/admin/overview",
    icon: LayoutDashboard,
  },
  {
    label: "Userssss",
    href: "/admin/users",
    icon: History,
  },
  {
    label: "Revenuesss",
    href: "/admin/revinue",
    icon: ShoppingBag,
  },
];
