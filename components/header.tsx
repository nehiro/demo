import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import UserMenu from './user-menu';
import { useAuth } from '../context/auth';
import Sidebar from './sidebar';
import { MenuIcon } from '@heroicons/react/outline';

const Header = () => {
  const { user, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsSidebarOpen(false);
  };
  const openModal = () => {
    setIsSidebarOpen(true);
  };

  if (isLoading) {
    return null;
  }
  return (
    <>
      <header className="relative z-20">
        <div className="container flex h-14 items-center border-b">
          <button className="mr-1 p-2" onClick={openModal}>
            <MenuIcon className="h-6 w-6" />
          </button>
          <Link href="/">
            <a className="flex">
              <Image src="/logo.svg" width={154} height={27} alt="Logoipsum" />
            </a>
          </Link>
          <span className="flex-1"></span>
          {user && (
            <Link href="/create-post">
              <a className="mr-4">投稿</a>
            </Link>
          )}
          {user ? (
            <UserMenu />
          ) : (
            <Link href="/login">
              <a>ログイン</a>
            </Link>
          )}
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} closeModal={closeModal} />
    </>
  );
};

export default Header;
