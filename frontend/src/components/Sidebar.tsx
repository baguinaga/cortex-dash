import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className='bg-slate-600 w-48 h-screen p-4'>
      <ul>
        <li>
          <Link
            href='/dashboard'
            className='block py-2 px-4 hover:bg-gray-300 rounded'
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href='/report'
            className='block py-2 px-4 hover:bg-gray-300 rounded'
          >
            Report
          </Link>
        </li>
      </ul>
    </aside>
  );
}
