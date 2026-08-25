import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../../components/admin/providers/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/admin/AppSidebar";
import { Navbar } from "../../components/admin/Navbar";

const AdminLayout = () => {
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar_state="))
      ?.split("=")[1];
    if (cookieValue !== undefined) {
      setDefaultOpen(cookieValue === "true");
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen overflow-hidden">
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <main className="w-full overflow-y-auto">
            <Navbar />
            <div className="px-4 pb-4">
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
