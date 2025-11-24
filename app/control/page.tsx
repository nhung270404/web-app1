import { ChartAreaInteractive } from '@/components/dashboard/chart';
import SumByPie from '@/components/dashboard/sum-by-pie';

export default function ManPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-muted/50 sm:p-3 md:p-5">
        </div>
        <div className="aspect-video rounded-xl bg-muted/50">
          <SumByPie />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
