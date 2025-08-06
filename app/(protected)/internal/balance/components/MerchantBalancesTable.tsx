import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, MoreHorizontal } from 'lucide-react';

interface Merchant {
  id: string;
  name: string;
  code: string;
  balance: number;
  dailyLimit: number;
  monthlyLimit: number;
  lastTopUp: string;
  totalTopUp: number;
  status: string;
}

export function MerchantBalancesTable({ merchants, searchTerm }: { merchants: Merchant[]; searchTerm: string }) {
  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Merchant</th>
            <th className="text-left py-3 px-4 font-medium">Code</th>
            <th className="text-left py-3 px-4 font-medium">Current Balance</th>
            <th className="text-left py-3 px-4 font-medium">Limits</th>
            <th className="text-left py-3 px-4 font-medium">Last Top-up</th>
            <th className="text-left py-3 px-4 font-medium">Total Top-up</th>
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
                <div className="font-medium text-green-600">Rp {merchant.balance.toLocaleString()}</div>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm">
                  <div>Daily: Rp {(merchant.dailyLimit / 1000000).toFixed(0)}M</div>
                  <div>Monthly: Rp {(merchant.monthlyLimit / 1000000).toFixed(0)}M</div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600">{merchant.lastTopUp}</td>
              <td className="py-4 px-4">
                <div className="font-medium">Rp {merchant.totalTopUp.toLocaleString()}</div>
              </td>
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