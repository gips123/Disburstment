import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  recipientName: string;
  status: string;
  amount: number;
  timeAgo: string;
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'SUCCESS': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'PENDING': return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'FAILED': return <XCircle className="h-4 w-4 text-red-600" />;
    default: return <Clock className="h-4 w-4" />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'SUCCESS': return 'bg-green-100 text-green-800';
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'FAILED': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function RecentTransactions({ recentTransactions }: { recentTransactions: Transaction[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 w-full">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                {getStatusIcon(transaction.status)}
                <div>
                  <div className="font-medium">{transaction.id}</div>
                  <div className="text-sm text-gray-600">{transaction.recipientName}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(transaction.status)}>
                  {transaction.status}
                </Badge>
                <div className="text-right">
                  <div className="font-medium">Rp {transaction.amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{transaction.timeAgo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 