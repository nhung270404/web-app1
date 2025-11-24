import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LangLayout from '@/app/control/lang';
import { ReactNode } from 'react';
import { IMenuSideBar } from '@/models/menu-sidebar.model';

export default async function ManLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  if (!token) {
    return redirect('/login');
  }
  const payload = await verifyToken(token);
  if (!payload) return redirect('/api/logout');
  const MenuSideBar: IMenuSideBar = {
    navMain: [
      {
        title: 'i_user',
        url: '/control/user',
        icon: 'User',
        items: [
          {
            title: 'i_create_user',
            url: '/control/user/create',
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: 'i_support',
        url: '#',
        icon: 'LifeBuoy',
      },
      {
        title: 'i_feedback',
        url: '#',
        icon: 'Send',
      },
    ],
  };
  return (
    <LangLayout payload={payload} menu={MenuSideBar}>{children}</LangLayout>
  );
}
