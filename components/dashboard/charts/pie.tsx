'use client';

import { Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent, ChartTooltip, ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  count: {
    label: 'So don',
  },
  '1': {
    label: 'CHỜ LẤY',
    color: 'var(--chart-1)',
  },
  '2': {
    label: 'NHẬN ĐƠN',
    color: 'var(--chart-2)',
  },
  '4': {
    label: 'ĐANG XỬ LÝ',
    color: 'var(--chart-3)',
  },
  '6': {
    label: 'ĐANG SẤY',
    color: 'var(--chart-4)',
  },
  '7': {
    label: 'ĐÓNG TÚI',
    color: 'var(--chart-5)',
  },
  '8': {
    label: 'GỬI ĐỒ',
    color: 'var(--chart-6)',
  },
  '9': {
    label: 'CHƯA THANH TOÁN',
    color: 'var(--chart-7)',
  },
  '10': {
    label: 'ĐÃ TRẢ',
    color: 'var(--chart-8)',
  },
} satisfies ChartConfig;

export function ChartPieLegend({ data }: { data: any }) {
  data.forEach((d: any, i: number) => {
    d.fill = `var(--color-${i + 1})`;
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={data} dataKey="count" label nameKey="id" />
        <ChartLegend
          content={<ChartLegendContent nameKey="id" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
