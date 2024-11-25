'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AddNewTransaction } from '@/app/_components/AddNewTransaction';
import { usePathname } from 'next/navigation';
import DarkModeToggle from '@/app/_components/DarkMode';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between px-2 sm:px-12  border shadow-sm w-full">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="./logo-color.svg" alt="Logo" width={100} height={100} />
        </Link>
      </div>

      <div className={'flex items-center gap-4'}>
        <DarkModeToggle />
        {pathname === '/dashboard' && <AddNewTransaction />}
        <Link href="/dashboard">
          <Button className="rounded-full">Dashboard</Button>
        </Link>
      </div>
    </header>
  );
}
