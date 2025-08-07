'use client';

import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, Row, SortingState, useReactTable } from '@tanstack/react-table';
import { EllipsisVertical, Eye, Filter, Search, Settings2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';


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

function getStatusColor(status: string) {
  switch (status) {
    case 'ACTIVE': return 'success';
    case 'SUSPENDED': return 'destructive';
    case 'PENDING': return 'warning';
    default: return 'secondary';
  }
}

function ActionsCell({ row }: { row: Row<Merchant> }) {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="sm" aria-label="Lihat detail">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" aria-label="Opsi lainnya">
        <EllipsisVertical className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function MerchantBalancesTable({ merchants }: { merchants: Merchant[] }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('latest');

  const filteredMerchants = useMemo(() => {
    let filtered = merchants;

    // Filter berdasarkan status
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((merchant) =>
        selectedStatuses.includes(merchant.status)
      );
    }

    // Filter berdasarkan pencarian
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (merchant) =>
          merchant.name.toLowerCase().includes(searchLower) ||
          merchant.code.toLowerCase().includes(searchLower)
      );
    }

    // Urutkan berdasarkan sortOrder (berdasarkan lastTopUp)
    if (sortOrder === 'latest') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.lastTopUp).getTime() - new Date(a.lastTopUp).getTime()
      );
    } else if (sortOrder === 'oldest') {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.lastTopUp).getTime() - new Date(b.lastTopUp).getTime()
      );
    }

    return filtered;
  }, [merchants, searchQuery, selectedStatuses, sortOrder]);

  const statusCounts = useMemo(() => {
    return merchants.reduce(
      (acc, merchant) => {
        const status = merchant.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [merchants]);

  const handleStatusChange = (checked: boolean, value: string) => {
    setSelectedStatuses((prev = []) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const columns = useMemo<ColumnDef<Merchant>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataGridColumnHeader title="Merchant" column={column} />
        ),
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-gray-600">ID: {row.original.id}</div>
          </div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        accessorKey: 'code',
        header: ({ column }) => (
          <DataGridColumnHeader title="Code" column={column} />
        ),
        cell: ({ row }) => (
          <Badge variant="outline">{row.original.code}</Badge>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: 'balance',
        header: ({ column }) => (
          <DataGridColumnHeader title="Current Balance" column={column} />
        ),
        cell: ({ row }) => (
          <div className="font-medium text-green-600">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(row.original.balance)}
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        accessorKey: 'limits',
        header: ({ column }) => (
          <DataGridColumnHeader title="Limits" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm">
            <div>Daily: {(row.original.dailyLimit / 1000000).toFixed(0)}M</div>
            <div>Monthly: {(row.original.monthlyLimit / 1000000).toFixed(0)}M</div>
          </div>
        ),
        enableSorting: false,
        size: 150,
      },
      {
        accessorKey: 'lastTopUp',
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Top-up" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-gray-600">{row.original.lastTopUp}</div>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: 'totalTopUp',
        header: ({ column }) => (
          <DataGridColumnHeader title="Total Top-up" column={column} />
        ),
        cell: ({ row }) => (
          <div className="font-medium">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(row.original.totalTopUp)}
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => <ActionsCell row={row} />,
        enableSorting: false,
        size: 100,
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: filteredMerchants,
    pageCount: Math.ceil((filteredMerchants?.length || 0) / pagination.pageSize),
    getRowId: (row: Merchant) => row.id,
    state: {
      pagination,
      sorting,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const Toolbar = () => {
    const { table } = useDataGrid();

    return (
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Settings2 className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <DataGridColumnVisibility
          table={table}
          trigger={
            <Button variant="outline">
              <Settings2 className="h-4 w-4 mr-2" />
              Columns
            </Button>
          }
        />
      </div>
    );
  };

  return (
    <DataGrid
      table={table}
      recordCount={filteredMerchants?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Merchant Balances</CardTitle>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Cari merchant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9 w-40"
                />
                {searchQuery.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Status
                    {selectedStatuses.length > 0 && (
                      <Badge size="sm" variant="outline">
                        {selectedStatuses.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3" align="start">
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground">
                      Filter Status
                    </div>
                    <div className="space-y-3">
                      {Object.keys(statusCounts).map((status) => (
                        <div key={status} className="flex items-center gap-2.5">
                          <Checkbox
                            id={status}
                            checked={selectedStatuses.includes(status)}
                            onCheckedChange={(checked) =>
                              handleStatusChange(checked === true, status)
                            }
                          />
                          <Label
                            htmlFor={status}
                            className="grow flex items-center justify-between font-normal gap-1.5"
                          >
                            {status}
                            <span className="text-muted-foreground">
                              {statusCounts[status]}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Urutan
                    {sortOrder !== 'latest' && (
                      <Badge size="sm" variant="outline">
                        {sortOrder === 'oldest' ? 'Terlama' : 'Terbaru'}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-3" align="start">
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-muted-foreground">
                      Urut Berdasarkan
                    </div>
                    <div className="space-y-3">
                      {['latest', 'oldest'].map((order) => (
                        <div key={order} className="flex items-center gap-2.5">
                          <Checkbox
                            id={order}
                            checked={sortOrder === order}
                            onCheckedChange={(checked) =>
                              checked && setSortOrder(order)
                            }
                          />
                          <Label
                            htmlFor={order}
                            className="grow flex items-center justify-between font-normal gap-1.5"
                          >
                            {order === 'latest' ? 'Terbaru' : 'Terlama'}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
}