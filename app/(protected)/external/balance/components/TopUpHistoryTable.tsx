import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal, CheckCircle, XCircle, Clock } from 'lucide-react';

interface TopUp {
  id: string;
  amount: number;
  status: string;
  maker: string;
  checker?: string;
  createdAt: string;
  reason: string;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-800';
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'REJECTED': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
function getStatusIcon(status: string) {
  switch (status) {
    case 'APPROVED': return <CheckCircle className="h-4 w-4" />;
    case 'PENDING': return <Clock className="h-4 w-4" />;
    case 'REJECTED': return <XCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
}

export function TopUpHistoryTable({ topUpHistory, searchTerm }: { topUpHistory: TopUp[]; searchTerm: string }) {
  const filteredTopUpHistory = topUpHistory.filter(history =>
    history.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    history.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Request ID</th>
            <th className="text-left py-3 px-4 font-medium">Amount</th>
            <th className="text-left py-3 px-4 font-medium">Reason</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-left py-3 px-4 font-medium">Maker</th>
            <th className="text-left py-3 px-4 font-medium">Created</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTopUpHistory.map((history) => (
            <tr key={history.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-4"><div className="font-medium">{history.id}</div></td>
              <td className="py-4 px-4"><div className="font-medium">Rp {history.amount.toLocaleString()}</div></td>
              <td className="py-4 px-4"><div className="text-sm">{history.reason}</div></td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(history.status)}
                  <Badge className={getStatusColor(history.status)}>{history.status}</Badge>
                </div>
              </td>
              <td className="py-4 px-4"><div className="text-sm">{history.maker}</div></td>
              <td className="py-4 px-4 text-sm text-gray-600">{history.createdAt}</td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}