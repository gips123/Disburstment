import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal, Edit, CheckCircle, XCircle, Repeat, Settings } from 'lucide-react';

interface AutomaticDisbursement {
  id: string;
  name: string;
  description: string;
  schedule: string;
  nextRun: string;
  totalRecipients: number;
  totalAmount: number;
  status: string;
  lastRun: string;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'ACTIVE': return 'bg-green-100 text-green-800';
    case 'INACTIVE': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'ACTIVE': return <CheckCircle className="h-4 w-4" />;
    case 'INACTIVE': return <XCircle className="h-4 w-4" />;
    default: return <XCircle className="h-4 w-4" />;
  }
}

export function AutomaticDisbursementsList({ automaticDisbursements }: { automaticDisbursements: AutomaticDisbursement[] }) {
  return (
    <div className="space-y-4">
      {automaticDisbursements.map((auto) => (
        <div key={auto.id} className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${getStatusColor(auto.status)}`}>
                <Repeat className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{auto.name}</h3>
                  <Badge className={getStatusColor(auto.status)}>
                    {auto.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{auto.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span>Schedule: {auto.schedule}</span>
                  <span>Next Run: {auto.nextRun}</span>
                  <span>Recipients: {auto.totalRecipients}</span>
                  <span>Amount: Rp {auto.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 