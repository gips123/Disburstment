import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Check, X, AlertTriangle, Building2, CreditCard, FileText, Users } from 'lucide-react';

interface Approval {
  id: string;
  type: string;
  entityName: string;
  description: string;
  maker: string;
  createdAt: string;
  status: string;
  data: any;
}

interface Merchant {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  balance: number;
  status: string;
  createdAt: string;
  dailyLimit: number;
  monthlyLimit: number;
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'MERCHANT_CREATION': return <Building2 className="h-4 w-4" />;
    case 'TOP_UP': return <CreditCard className="h-4 w-4" />;
    case 'DISBURSEMENT': return <FileText className="h-4 w-4" />;
    case 'USER_CREATION': return <Users className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'MERCHANT_CREATION': return 'bg-blue-100 text-blue-800';
    case 'TOP_UP': return 'bg-green-100 text-green-800';
    case 'DISBURSEMENT': return 'bg-purple-100 text-purple-800';
    case 'USER_CREATION': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'APPROVED': return 'bg-green-100 text-green-800';
    case 'REJECTED': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function ApprovalList({ 
  approvals, 
  activeTab, 
  setActiveTab, 
  setMerchants,
  setApprovals 
}: {
  approvals: Approval[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setMerchants: React.Dispatch<React.SetStateAction<Merchant[]>>;
  setApprovals: React.Dispatch<React.SetStateAction<Approval[]>>;
}) {
  const pendingCount = approvals.filter(a => a.status === 'PENDING').length;
  const approvedCount = approvals.filter(a => a.status === 'APPROVED').length;
  const rejectedCount = approvals.filter(a => a.status === 'REJECTED').length;

  const filteredApprovals = approvals.filter(approval => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return approval.status === 'PENDING';
    if (activeTab === 'approved') return approval.status === 'APPROVED';
    if (activeTab === 'rejected') return approval.status === 'REJECTED';
    return true;
  });

  const handleApprove = (approval: Approval) => {
    if (approval.type === 'MERCHANT_CREATION') {
      setMerchants((prev) =>
        prev.map((merchant) =>
          merchant.id === approval.data.id
            ? { ...merchant, status: 'ACTIVE' }
            : merchant
        )
      );
    }
    // Update status approval
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === approval.id ? { ...item, status: 'APPROVED' } : item
      )
    );
  };

  const handleReject = (approval: Approval) => {
    if (approval.type === 'MERCHANT_CREATION') {
      setMerchants((prev) =>
        prev.filter((merchant) => merchant.id !== approval.data.id)
      );
    }
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === approval.id ? { ...item, status: 'REJECTED' } : item
      )
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">Semua ({approvals.length})</TabsTrigger>
        <TabsTrigger value="pending">Menunggu ({pendingCount})</TabsTrigger>
        <TabsTrigger value="approved">Disetujui ({approvedCount})</TabsTrigger>
        <TabsTrigger value="rejected">Ditolak ({rejectedCount})</TabsTrigger>
      </TabsList>
      <TabsContent value={activeTab} className="mt-6">
        <div className="space-y-4">
          {filteredApprovals.map((approval) => (
            <div key={approval.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${getTypeColor(approval.type)}`}>
                    {getTypeIcon(approval.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{approval.entityName}</h3>
                      <Badge className={getStatusColor(approval.status)}>
                        {approval.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{approval.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Pembuat: {approval.maker}</span>
                      <span>Dibuat: {approval.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {approval.status === 'PENDING' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600"
                        onClick={() => handleApprove(approval)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Setujui
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => handleReject(approval)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Tolak
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}