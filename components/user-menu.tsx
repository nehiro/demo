import { Menu, Transition } from '@headlessui/react';
import {
  forwardRef,
  Fragment,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { logout } from '../lib/auth';

const items = [
  { label: 'プロフィール', href: '/profile' },
  { label: '設定', href: '/settings' },
];

const MyLink = forwardRef<
  HTMLAnchorElement,
  { href: string; children: ReactNode; className: string }
>((props, ref) => {
  let { href, children, className, ...rest } = props;
  return (
    <Link href={href}>
      <a className={className} ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

MyLink.displayName = 'MyLink';

const UserMenu = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-slate-300 block rounded-full h-9 w-9"></Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {items.map((item) => (
              <Menu.Item key={item.label}>
                {({ active }) => (
                  <MyLink
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    href={item.href}
                  >
                    {item.label}
                  </MyLink>
                )}
              </Menu.Item>
            ))}
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={logout}
                >
                  ログアウト
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
