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
import { GithubLogo } from "./icons/GithubLogo";
import { ChevronsUpDown } from "lucide-react";

// TODO: Create an automated script/function to load availabel configs, Post MVP
const availableThemes = [
  { id: "pharmacy", name: "Pharmacy Ops" },
  { id: "healthcare", name: "Healthcare Ops" },
  { id: "security", name: "Security Analysis (WIP)", disabled: true },
];

export default function Navbar() {
  const params = useParams();
  const currentThemeId = typeof params.theme === "string" ? params.theme : "";
  const currentTheme =
    availableThemes.find((t) => t.id === currentThemeId) || availableThemes[0];

  return (
    <nav className='bg-background border-b border-border flex items-center h-20 px-4 sm:px-6 shrink-0'>
      <div className='flex items-center gap-8'>
        <h1 className='text-foreground text-2xl font-semibold hidden sm:block md:pr-8'>
          CortexDash
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='text-black w-[200px] justify-between'
            >
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
      <div className='flex ml-auto'>
        <a
          href='https://github.com/baguinaga/Cortex-Dash'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button variant='outline' size='sm'>
            <GithubLogo className='h-4 w-4' />
            GitHub
          </Button>
        </a>
      </div>
    </nav>
  );
}
