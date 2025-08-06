import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal, Edit, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Disbursement {
  id: string;
  recipientName: string;
  recipientAccount: string;
  recipientBank: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  processedAt?: string;
  type: string;
  recipientId: string;
  failureReason?: string;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'SUCCESS': return 'bg-green-100 text-green-800';
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'FAILED': return 'bg-red-100 text-red-800';
    case 'PROCESSING': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'SUCCESS': return <CheckCircle className="h-4 w-4" />;
    case 'PENDING': return <Clock className="h-4 w-4" />;
    case 'FAILED': return <XCircle className="h-4 w-4" />;
    case 'PROCESSING': return <Clock className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'SALARY': return 'bg-blue-100 text-blue-800';
    case 'CONTRACTOR': return 'bg-green-100 text-green-800';
    case 'VENDOR': return 'bg-purple-100 text-purple-800';
    case 'BONUS': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function DisbursementsTable({ disbursements, searchTerm }: { disbursements: Disbursement[]; searchTerm: string }) {
  const filteredDisbursements = disbursements.filter(disbursement =>
    disbursement.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disbursement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disbursement.recipientBank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
            <th className="text-left py-3 px-4 font-medium">Recipient</th>
            <th className="text-left py-3 px-4 font-medium">Type</th>
            <th className="text-left py-3 px-4 font-medium">Bank</th>
            <th className="text-left py-3 px-4 font-medium">Amount</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-left py-3 px-4 font-medium">Created</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDisbursements.map((disbursement) => (
            <tr key={disbursement.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="font-medium">{disbursement.id}</div>
              </td>
              <td className="py-4 px-4">
                <div>
                  <div className="font-medium">{disbursement.recipientName}</div>
                  <div className="text-sm text-gray-600">{disbursement.recipientAccount}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <Badge className={getTypeColor(disbursement.type)}>
                  {disbursement.type}
                </Badge>
              </td>
              <td className="py-4 px-4">
                <Badge variant="outline">{disbursement.recipientBank}</Badge>
              </td>
              <td className="py-4 px-4">
                <div className="font-medium">
                  Rp {disbursement.amount.toLocaleString()}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(disbursement.status)}
                  <Badge className={getStatusColor(disbursement.status)}>
                    {disbursement.status}
                  </Badge>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600">
                {disbursement.createdAt}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {disbursement.status === 'PENDING' && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 