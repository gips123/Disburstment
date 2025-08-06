import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, CheckCircle, Clock } from 'lucide-react';

interface Disbursement {
  id: string;
  amount: number;
  status: string;
}

export function StatsCards({ disbursements }: { disbursements: Disbursement[] }) {
  const totalAmount = disbursements.reduce((sum, d) => sum + d.amount, 0);
  const successCount = disbursements.filter(d => d.status === 'SUCCESS').length;
  const pendingCount = disbursements.filter(d => d.status === 'PENDING').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{disbursements.length}</div>
          <p className="text-xs text-muted-foreground">All time transactions</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp {(totalAmount / 1000000).toFixed(1)}M</div>
          <p className="text-xs text-muted-foreground">Total disbursed</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {disbursements.length ? Math.round((successCount / disbursements.length) * 100) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">Successful transactions</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          <p className="text-xs text-muted-foreground">Awaiting approval</p>
        </CardContent>
      </Card>
    </div>
  );
} 