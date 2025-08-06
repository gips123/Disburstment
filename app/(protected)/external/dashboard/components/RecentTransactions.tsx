import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  status: string;
  time: string;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'SUCCESS':
      return 'bg-green-100 text-green-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'FAILED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'SUCCESS':
      return <CheckCircle className="h-4 w-4" />;
    case 'PENDING':
      return <Clock className="h-4 w-4" />;
    case 'FAILED':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

export function RecentTransactions({ recentTransactions }: { recentTransactions: Transaction[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(transaction.status)}
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium">{transaction.id}</p>
                  <p className="text-sm text-gray-600">{transaction.recipient}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  Rp {transaction.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">{transaction.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}