import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../../hooks/useAuth";
import { ThemeProvider } from "../../components/admin/providers/ThemeProvider";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/admin/AppSidebar";
import { Navbar } from "../../components/admin/Navbar";

const AdminLayout = () => {
  const { data: me, isLoading } = useMe();
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading admin...</p>
      </div>
    );
  }

  if (me?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

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
            <div className="p-4">
              <Outlet />
            </div>
          </main>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
