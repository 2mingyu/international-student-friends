import { useState } from "react";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router";

export default function RootPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header openSidebar={openSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main className="flex flex-grow flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
