

import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../admin/shared/AdminSidebar";
import AdminTopbar from "../admin/shared/AdminTopbar";

const PGAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#070b1a] text-white">
      {/* Background Effects */}
      <div className="pointer-events-none fixed left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-pink-500/10 blur-3xl"></div>
      <div className="pointer-events-none fixed bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden xl:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden">
            <div className="w-[280px]">
              <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
          {/* Topbar */}
          <AdminTopbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto px-4 py-5 md:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1700px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PGAdminLayout;