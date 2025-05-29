import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className='bg-gray-800 text-white p-4 flex items-center'>
      <span>Security Risk UI</span>
      <ul className='flex space-x-4 ml-auto'>
        <li>
          <Link href='/login' className='hover:underline'>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
