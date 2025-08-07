'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Filter, Upload, Settings } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { DisbursementsTable } from './components/DisbursementsTable';
import { AutomaticDisbursementsList } from './components/AutomaticDisbursementsList';
import { disbursements, automaticDisbursements } from './data/dummy-disbursements';

export default function DisbursementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('manual');

  return (
    <div className="w-full h-full p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Disbursements</h1>
          <p className="text-gray-600">Manage manual and automatic disbursements</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Bulk Upload</span>
          </Button>
          <Button
            className="flex items-center space-x-2"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="h-4 w-4" />
            <span>New Disbursement</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="w-full">
        <StatsCards disbursements={disbursements} />
      </div>

      {/* Tabs for Manual and Automatic Disbursements */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Disbursements</TabsTrigger>
          <TabsTrigger value="automatic">Automatic Disbursements</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6 w-full">
          {/* New Disbursement Form */}
          {showForm && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>New Disbursement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipient">Select Recipient</Label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">Choose recipient</option>
                        <option value="USR-001">Budi - Employee</option>
                        <option value="USR-002">Sela - Contractor</option>
                        <option value="USR-003">Fery - Vendor</option>
                        <option value="USR-004">Gracia - Employee</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" type="number" placeholder="Enter amount" />
                    </div>
                    <div>
                      <Label htmlFor="type">Disbursement Type</Label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">Select type</option>
                        <option value="SALARY">Salary</option>
                        <option value="BONUS">Bonus</option>
                        <option value="CONTRACTOR">Contractor Payment</option>
                        <option value="VENDOR">Vendor Payment</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Enter description" />
                    </div>
                    <div>
                      <Label htmlFor="schedule">Schedule (Optional)</Label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">One-time payment</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="BI_WEEKLY">Bi-weekly</option>
                        <option value="MONTHLY">Monthly</option>
                      </select>
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button className="flex-1">Submit for Approval</Button>
                      <Button variant="outline" onClick={() => setShowForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transactions List */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Recent Transactions</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DisbursementsTable disbursements={disbursements} searchTerm={searchTerm} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automatic" className="space-y-6 w-full">
          {/* Automatic Disbursements */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Automatic Disbursements</CardTitle>
                <Button className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Configure Auto-Disbursement</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AutomaticDisbursementsList automaticDisbursements={automaticDisbursements} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 