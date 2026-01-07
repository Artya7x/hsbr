
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSideBar";
import SiteHeader from "@/components/layout/SiteHeader";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "260px",
        "--header-height": "60px",
      }}
    >
     <AppSidebar variant="inset" />
      <SidebarInset className="border border-border shadow-none">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
