import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, TrendingUp, AlertTriangle } from 'lucide-react';

interface Merchant {
  status: string;
  balance: number;
  totalTopUp: number;
}
interface TopUp {
  status: string;
}

export function StatsCards({ merchants, topUpHistory }: { merchants: Merchant[]; topUpHistory: TopUp[] }) {
  const totalBalance = merchants.reduce((sum, m) => sum + m.balance, 0);
  const totalTopUp = merchants.reduce((sum, m) => sum + (m.totalTopUp || 0), 0);
  const activeCount = merchants.filter(m => m.status === 'ACTIVE').length;
  const pendingTopUps = topUpHistory.filter(t => t.status === 'PENDING').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp {(totalBalance / 1000000).toFixed(0)}M</div>
          <p className="text-xs text-muted-foreground">Across all merchants</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Top-up</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp {(totalTopUp / 1000000).toFixed(0)}M</div>
          <p className="text-xs text-muted-foreground">All time top-ups</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Merchants</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCount}</div>
          <p className="text-xs text-muted-foreground">With active balances</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Top-ups</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{pendingTopUps}</div>
          <p className="text-xs text-muted-foreground">Require approval</p>
        </CardContent>
      </Card>
    </div>
  );
}