"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

const availableThemes = [
  { id: "healthcare", name: "Healthcare Ops" },
  { id: "security", name: "Security Analysis (WIP)", disabled: true },
];

export default function Navbar() {
  const params = useParams();
  const currentThemeId = typeof params.theme === "string" ? params.theme : "";
  const currentTheme =
    availableThemes.find((t) => t.id === currentThemeId) || availableThemes[0];

  return (
    <nav className='flex items-center h-14 px-4 sm:px-6 bg-background border-b border-border shrink-0'>
      <div className='flex items-center gap-4'>
        <h1 className='text-lg font-semibold text-foreground hidden sm:block'>
          CortexDash
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='w-[200px] justify-between'>
              {currentTheme.name}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[200px]'>
            <DropdownMenuLabel>Select a Dashboard</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableThemes.map((theme) => (
              <Link
                href={!theme.disabled ? `/dashboard/${theme.id}` : "#"}
                key={theme.id}
                passHref
              >
                <DropdownMenuItem disabled={theme.disabled}>
                  {theme.name}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='ml-auto'>
        <span className='text-sm text-muted-foreground'>
          Analytics Platform
        </span>
      </div>
    </nav>
  );
}
