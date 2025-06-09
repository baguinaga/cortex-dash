import React from "react";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-full flex flex-col overflow-hidden'>
      <Navbar />
      {children}
    </div>
  );
}
