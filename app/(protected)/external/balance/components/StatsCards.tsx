import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, CreditCard, AlertTriangle } from 'lucide-react';

interface BalanceInfo {
  currentBalance: number;
  dailyLimit: number;
  monthlyLimit: number;
  usedToday: number;
  usedThisMonth: number;
  totalTopUp: number;
}

export function StatsCards({ balanceInfo }: { balanceInfo: BalanceInfo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">Rp {balanceInfo.currentBalance.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Available for disbursement</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Limit</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp {balanceInfo.dailyLimit.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Used: Rp {balanceInfo.usedToday.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Limit</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp {balanceInfo.monthlyLimit.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Used: Rp {balanceInfo.usedThisMonth.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Top-up</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp {balanceInfo.totalTopUp.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">All time top-ups</p>
        </CardContent>
      </Card>
    </div>
  );
}