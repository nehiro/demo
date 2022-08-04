import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const links = [
  { label: 'ホーム', path: '/' },
  { label: '記事検索', path: '/search' },
  { label: '設定 ', path: '/settings' },
];

const Footer = () => {
  return (
    <footer className="bg-slate-100 py-10 mt-10">
      <div className="container">
        <div className="mb-6">
          <Link href="/">
            <a className="flex">
              <Image src="/logo.svg" width={154} height={27} alt="Logoipsum" />
            </a>
          </Link>
        </div>

        <div>
          <h2 className="mb-3 text-slate-500">メニュー</h2>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.path}>
                  <a className="hover:text-blue-500">{link.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-slate-400">© 2022 nerio.</p>
      </div>
    </footer>
  );
};

export default Footer;
