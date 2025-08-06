'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ExternalTransferPage() {
  return (
    <div className="w-full h-full p-6 space-y-6 overflow-y-auto">
      <h1 className="text-2xl font-bold">Transfer (Merchant)</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Transfer Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="to">Recipient Account</Label>
              <Input id="to" placeholder="Enter account number" />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="Enter amount" />
            </div>
            <Button type="submit">Transfer</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500">[Transfer history component placeholder]</div>
        </CardContent>
      </Card>
    </div>
  );
}