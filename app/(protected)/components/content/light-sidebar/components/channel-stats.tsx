import { Fragment } from 'react';
import {
  CircleQuestionMark,
  CircleX,
  LucideIcon,
  MailCheck,
} from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';

interface IChannelStatsItem {
  icon: LucideIcon;
  logoDark?: string;
  info: string;
  desc: string;
  path: string;
}
type IChannelStatsItems = Array<IChannelStatsItem>;

const ChannelStats = () => {
  const items: IChannelStatsItems = [
    {
      icon: MailCheck,
      info: '120',
      desc: 'Disbursement Volume',
      path: '',
    },
    {
      icon: CircleQuestionMark,
      info: '120',
      desc: 'Inquiry Volume',
      path: '',
    },
    {
      icon: CircleX,
      info: '608',
      desc: 'Fail Disburse',
      path: '',
    },
  ];

  const renderItem = (item: IChannelStatsItem, index: number) => {
    return (
      <Card key={index}>
        <CardContent className="p-0 flex flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
          {item.icon && (
            <item.icon className="m-4" data-slot="card-highlight-icon" />
          )}
          <div className="flex flex-col gap-1 pb-4 px-5">
            <span className="text-3xl font-semibold text-mono">
              {item.info}
            </span>
            <span className="text-sm font-normal text-muted-forehead">
              {item.desc}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Fragment>
      <style>
        {`
          .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3.png')}');
          }
          .dark .channel-stats-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/bg-3-dark.png')}');
          }
        `}
      </style>

      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Fragment>
  );
};

export { ChannelStats, type IChannelStatsItem, type IChannelStatsItems };
