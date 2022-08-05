import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Sidebar = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: VoidFunction;
}) => {
  const links = [
    { href: '/', label: 'ホーム' },
    { href: '/search', label: '検索' },
    { href: '/about', label: 'このサイトについて' },
  ];
  const subLinks = [
    { href: '/company', label: '会社概要' },
    { href: '/terms', label: '利用規約' },
    { href: '/privacy', label: 'プライバシーポリシー' },
    { href: '/support', label: 'サポート' },
    { href: '/contact', label: 'お問い合わせ' },
    { href: '/help', label: 'ヘルプ' },
  ];

  const routor = useRouter();
  useEffect(() => {
    routor.events.on('routeChangeStart', closeModal);
    return () => routor.events.off('routeChangeStart', closeModal);
  }, []);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 z-20 w-80 overflow-y-auto bg-white p-6">
              <Link href="/">
                <a className="mb-6 flex">
                  <Image
                    src="/logo.svg"
                    width={154}
                    height={27}
                    alt="Logoipsum"
                  />
                </a>
              </Link>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <a className="block p-1 hover:text-blue-500">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className="my-6" />
              <ul className="space-y-2">
                {subLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <a className="block p-1 text-slate-600 hover:text-blue-500">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-slate-400">© 2022 nerio.</p>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default Sidebar;
