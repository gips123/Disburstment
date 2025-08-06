import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Edit, MoreHorizontal } from 'lucide-react';

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

function getStatusColor(status: string) {
  switch (status) {
    case 'ACTIVE': return 'bg-green-100 text-green-800';
    case 'SUSPENDED': return 'bg-red-100 text-red-800';
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function MerchantsTable({ merchants, searchTerm }: { merchants: Merchant[]; searchTerm: string }) {
  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Merchant</th>
            <th className="text-left py-3 px-4 font-medium">Code</th>
            <th className="text-left py-3 px-4 font-medium">Contact</th>
            <th className="text-left py-3 px-4 font-medium">Balance</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-left py-3 px-4 font-medium">Limits</th>
            <th className="text-left py-3 px-4 font-medium">Created</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMerchants.map((merchant) => (
            <tr key={merchant.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-4">
                <div>
                  <div className="font-medium">{merchant.name}</div>
                  <div className="text-sm text-gray-600">ID: {merchant.id}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <Badge variant="outline">{merchant.code}</Badge>
              </td>
              <td className="py-4 px-4">
                <div>
                  <div className="text-sm">{merchant.email}</div>
                  <div className="text-sm text-gray-600">{merchant.phone}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="font-medium">Rp {merchant.balance.toLocaleString()}</div>
              </td>
              <td className="py-4 px-4">
                <Badge className={getStatusColor(merchant.status)}>{merchant.status}</Badge>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm">
                  <div>Daily: Rp {(merchant.dailyLimit / 1000000).toFixed(0)}M</div>
                  <div>Monthly: Rp {(merchant.monthlyLimit / 1000000).toFixed(0)}M</div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600">{merchant.createdAt}</td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
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