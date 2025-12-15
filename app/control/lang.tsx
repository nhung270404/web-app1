'use client'

import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar';
import {SiteHeader} from '@/components/site-header';
import {AppSidebar} from '@/components/app-sidebar';
import {IUser} from "@/models/user.model";
import {IMenuSideBar} from "@/models/menu-sidebar.model";
import {ReactNode} from 'react';

export default function LangLandingLayout({children, payload, menu}: {
	children: ReactNode,
	payload: IUser,
	menu: IMenuSideBar
}) {
	return (
		<div className="[--header-height:calc(--spacing(14))]">
			<SidebarProvider className="flex flex-col">
				<SiteHeader/>
				<div className="flex flex-1">
					<AppSidebar data={menu} user={payload}/>
					<SidebarInset className="p-3">{children}</SidebarInset>
				</div>
			</SidebarProvider>
		</div>
	);
}