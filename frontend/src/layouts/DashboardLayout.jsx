import { Logo } from "../components/ui/Logo.jsx";
import { Button } from "../components/ui/Button.jsx";
import {
  Home,
  LayoutGrid,
  Package,
  ShoppingCart,
  PanelLeft,
  Bell,
  Users,
  Truck,
  ChartNoAxesCombined,
  Settings,
  ChartPie,
  Container,
  LogOut,
  UserPen,
  UserRound,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/Popover.jsx";
import { useAuth } from "../hooks/useAuth.js";

export function DashboardLayout({ children, header }) {
  const { user, logout } = useAuth();
  const navItems = [
    { label: "Dashboard", icon: Home, to: "/dashboard" },
    { label: "Categories", icon: LayoutGrid, to: "/categories" },
    { label: "Products", icon: Package, to: "/products" },
    { label: "Stocks", icon: Container, to: "/stocks" },
    { label: "Suppliers", icon: Truck, to: "/suppliers" },
    { label: "Purchases", icon: ShoppingCart, to: "/purchases" },
    { label: "Customers", icon: Users, to: "/customers" },
    { label: "Sales", icon: ChartNoAxesCombined, to: "/sales" },
    { label: "Report", icon: ChartPie, to: "/report" },
    { label: "Settings", icon: Settings, to: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 hidden md:block p-4">
        <div className="flex flex-col gap-4 h-full">
          <Logo />
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex flex-col gap-4 flex-1 h-screen ml-0 md:ml-64 p-4 overflow-y-auto">
        <header className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" className="text-black">
              <PanelLeft size={18} />
            </Button>

            {header && <h1 className="text-xl font-semibold">{header}</h1>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-black">
              <Bell size={18} />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-black"
                >
                  <UserRound size={18} />
                  <span>{user?.name || "Guest"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <div className="w-full flex flex-col items-start gap-2">
                  <Link
                    to="#"
                    className="w-full flex items-center text-sm font-medium px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <UserPen size={18} className="mr-3" /> Profile
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={logout}
                    className="w-full flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
