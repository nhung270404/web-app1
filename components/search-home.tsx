'use client';

import {Label} from '@/components/ui/label';
import {SidebarInput} from '@/components/ui/sidebar';
import { ComponentProps, useEffect, useState } from 'react';
import {useTranslation} from "react-i18next";

export function SearchHome({...props}: ComponentProps<'form'>) {
	const {t} = useTranslation();
	const [value, setValue] = useState<string>('');

	useEffect(() => {
		if (!value || value.length <= 0) return;
	}, [value]);

	return (
		<form {...props}>
			<div className="relative">
				<Label htmlFor="search" className="sr-only">
					Search
				</Label>
				<SidebarInput onChange={(e) => setValue(e.target.value)} id="search" placeholder={t('i_find_what')}
				              className="h-8 pl-7"/>
			</div>
		</form>
	);
}
