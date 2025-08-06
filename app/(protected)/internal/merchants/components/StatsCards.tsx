import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Shield } from 'lucide-react';

interface Merchant {
  status: string;
  balance: number;
  dailyLimit: number;
  monthlyLimit: number;
}

export function StatsCards({ merchants }: { merchants: Merchant[] }) {
  const totalBalance = merchants.reduce((sum, m) => sum + m.balance, 0);
  const activeCount = merchants.filter(m => m.status === 'ACTIVE').length;
  const suspendedCount = merchants.filter(m => m.status === 'SUSPENDED').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{merchants.length}</div>
          <p className="text-xs text-muted-foreground">{activeCount} active</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp {(totalBalance / 1000000).toFixed(0)}M</div>
          <p className="text-xs text-muted-foreground">Across all merchants</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Merchants</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCount}</div>
          <p className="text-xs text-muted-foreground">Currently active</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Suspended</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{suspendedCount}</div>
          <p className="text-xs text-muted-foreground">Temporarily disabled</p>
        </CardContent>
      </Card>
    </div>
  );
}