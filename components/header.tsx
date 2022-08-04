import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import UserMenu from './user-menu';
import { useAuth } from '../context/auth';

const Header = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return null;
  }
  return (
    <header>
      <div className="flex items-center h-14 border-b container">
        <Link href="/">
          <a className="flex">
            <Image src="/logo.svg" width={154} height={27} alt="Logoipsum" />
          </a>
        </Link>
        <span className="flex-1"></span>
        {user ? (
          <UserMenu />
        ) : (
          <Link href="/login">
            <a>ログイン</a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
