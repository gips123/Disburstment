'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExternalSettingsPage() {
  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Settings (Merchant)</h1>
      <Tabs defaultValue="user" className="w-full">
        <TabsList>
          <TabsTrigger value="user">User Management</TabsTrigger>
          <TabsTrigger value="role">Role Management</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-500">[User management component placeholder]</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="role">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-500">[Role management component placeholder]</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}