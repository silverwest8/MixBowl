'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@tremor/react';
import Cookies from 'js-cookie';

const navigation = [
  { name: '콘텐츠 관리', href: '/' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();
  function logout() {
    Cookies.remove('token')
    window.location.reload()
  }
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">Cocktell</div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'border-slate-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              size="xs"
              variant="secondary"
              className='text-black border-black hover:bg-inherit'
              onClick={logout}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
