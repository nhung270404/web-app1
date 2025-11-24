import { IPagination } from '@/models/common.model';
import { ReactNode } from 'react';

export type Column<T> = {
  title: string
  key: keyof T
  render?: (value: any, row: T, index: number) => ReactNode
  percent?: number
}

export type DataListProps<T> = {
  data: T[]
  columns: Column<T>[]
  pagination: IPagination
  cb: (page: number) => void
}