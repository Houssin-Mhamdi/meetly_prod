import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Settings,
  Briefcase,
  ClipboardList,
  BarChart,
  Calendar1,
  Store,
  Palette,
  Navigation,
  Settings2,
  FileEdit,
  Layout,
} from "lucide-react"

export const sidebarNav = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Calendar", href: "/calendar", icon: Calendar },
  { title: "Clients", href: "/clients", icon: Users },
  { title: "Invoices", href: "/invoices", icon: FileText },
  { title: "Staff", href: "/staff", icon: Briefcase },
  { title: "Appointments", href: "/appointments", icon: ClipboardList },
  { title: "Events", href: "/events", icon: Calendar1 },
  { title: "Reports", href: "/reports", icon: BarChart },
  {
    title: "Online Store",
    icon: Store,
    items: [
      { title: "Themes", href: "/online-store/themes", icon: Palette },
      { title: "Pages", href: "/online-store/pages", icon: Layout },
      { title: "Blog Posts", href: "/online-store/blog", icon: FileEdit },
      { title: "Navigation", href: "/online-store/navigation", icon: Navigation },
      { title: "Preferences", href: "/online-store/preferences", icon: Settings2 },
    ],
  },
]

export const settingsNav = [
  { title: "General", href: "/settings/general" },
  { title: "Online Booking", href: "/settings/online-booking" },
  { title: "Services", href: "/settings/services" },
  { title: "Team", href: "/settings/team" },
  { title: "Payments", href: "/settings/payments" },
]

