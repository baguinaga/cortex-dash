"use client";

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

interface Theme {
  id: string;
  name: string;
  disabled: boolean;
}

// TODO: Create an automated script/function to load available configs, Post MVP
const availableThemes: Theme[] = [
  { id: "pharmacy", name: "Pharmacy Config", disabled: false },
  { id: "healthcare", name: "Healthcare Config", disabled: false },
];

export default function Navbar() {
  const params = useParams();
  const currentThemeId = typeof params.theme === "string" ? params.theme : "";
  const currentTheme =
    availableThemes.find((t) => t.id === currentThemeId) || availableThemes[0];

  return (
    <nav className='bg-background border-b border-border flex items-center justify-between h-16 px-6 sm:px-18 shrink-0'>
      <h1 className='text-foreground text-3xl font-semibold hidden sm:block'>
        CortexDash
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='text-black text-md w-[200px] justify-between'
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

      <div className='flex'>
        <a
          href='https://github.com/baguinaga/Cortex-Dash'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button variant='outline' size='sm' className='text-md'>
            <GithubLogo className='h-4 w-4' />
            GitHub
          </Button>
        </a>
      </div>
    </nav>
  );
}
