'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { MerchantsTable } from './components/MerchantsTable';
import { merchants as initialMerchants } from './data/dummy-merchants';
import { approvals as initialApprovals } from '../approvals/data/dummy-approvals';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';

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

// Skema validasi menggunakan Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus minimal 2 karakter' }),
  code: z.string().min(3, { message: 'Kode harus minimal 3 karakter' }),
  email: z.string().email({ message: 'Email tidak valid' }),
  phone: z.string().regex(/^\+62\d{9,12}$/, { message: 'Nomor telepon harus format +62 diikuti 9-12 angka' }),
  dailyLimit: z.number().min(1000000, { message: 'Limit harian minimal Rp 1.000.000' }),
  monthlyLimit: z.number().min(10000000, { message: 'Limit bulanan minimal Rp 10.000.000' }),
});

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>(initialMerchants);
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);

  // Inisialisasi form dengan react-hook-form dan zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      code: '',
      email: '',
      phone: '',
      dailyLimit: 1000000,
      monthlyLimit: 10000000,
    },
  });

  // Fungsi untuk handle submit form
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newMerchant: Merchant = {
      id: `MCH-${String(merchants.length + 1).padStart(3, '0')}`,
      name: values.name,
      code: values.code,
      email: values.email,
      phone: values.phone,
      balance: 0,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
      dailyLimit: values.dailyLimit,
      monthlyLimit: values.monthlyLimit,
    };

    const newApproval: Approval = {
      id: `APV-${String(approvals.length + 1).padStart(3, '0')}`,
      type: 'MERCHANT_CREATION',
      entityName: values.name,
      description: 'Pendaftaran merchant baru',
      maker: 'Admin', // Ganti dengan user yang login di aplikasi nyata
      createdAt: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString(),
      status: 'PENDING',
      data: newMerchant,
    };

    setApprovals((prev) => [...prev, newApproval]);
    setMerchants((prev) => [...prev, newMerchant]); // Tambahkan merchant ke tabel dengan status PENDING
    form.reset();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Merchant</h1>
          <p className="text-gray-600">Kelola semua merchant yang terdaftar</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Tambah Merchant Baru</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Merchant Baru</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Merchant</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama merchant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Merchant</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan kode merchant" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input placeholder="+6281234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dailyLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit Harian (Rp)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Masukkan limit harian"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="monthlyLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit Bulanan (Rp)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Masukkan limit bulanan"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Batal
                  </Button>
                  <Button type="submit">Simpan</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <StatsCards merchants={merchants} />

      {/* Table with Filters */}
      <MerchantsTable merchants={merchants} setMerchants={setMerchants} />
    </div>
  );
}