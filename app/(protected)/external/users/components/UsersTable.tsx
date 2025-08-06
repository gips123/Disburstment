import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Shield, MapPin, CheckSquare, Square, Eye, Edit, MoreHorizontal, DollarSign } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  bankAccount: string;
  bankName: string;
  monthlySalary: number;
  lastDisbursement: string;
  totalDisbursed: number;
  location: string;
  department: string;
  createdAt: string;
}

function getRoleColor(role: string) {
  switch (role) {
    case 'EMPLOYEE': return 'bg-blue-100 text-blue-800';
    case 'CONTRACTOR': return 'bg-green-100 text-green-800';
    case 'VENDOR': return 'bg-purple-100 text-purple-800';
    case 'PARTNER': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'ACTIVE': return 'bg-green-100 text-green-800';
    case 'INACTIVE': return 'bg-red-100 text-red-800';
    case 'SUSPENDED': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'ACTIVE': return <CheckCircle className="h-4 w-4" />;
    case 'INACTIVE': return <XCircle className="h-4 w-4" />;
    case 'SUSPENDED': return <Shield className="h-4 w-4" />;
    default: return <Shield className="h-4 w-4" />;
  }
}

export function UsersTable({ users, searchTerm }: { users: User[]; searchTerm: string }) {
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Member</th>
            <th className="text-left py-3 px-4 font-medium">Role</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-left py-3 px-4 font-medium">Location</th>
            <th className="text-left py-3 px-4 font-medium">Salary</th>
            <th className="text-left py-3 px-4 font-medium">Last Disbursement</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <Badge className={getRoleColor(user.role)}>
                  {user.role}
                </Badge>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(user.status)}
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{user.location}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="font-medium">
                  Rp {user.monthlySalary.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Monthly</div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600">
                {user.lastDisbursement}
              </td>
              <td className="py-4 px-4">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}