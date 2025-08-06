'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InternalHistoryPage() {
  return (
    <div className="w-full h-full p-6 space-y-6 overflow-y-auto">
      <h1 className="text-2xl font-bold">History (Internal)</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500">[Transaction history component placeholder]</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Topup History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500">[Topup history component placeholder]</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Approval History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500">[Approval history component placeholder]</div>
        </CardContent>
      </Card>
    </div>
  );
}