'use client';

import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, Row, SortingState, useReactTable } from '@tanstack/react-table';
import { Eye, Filter, Search, Settings2, X, MoreHorizontal } from 'lucide-react';
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


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  lastLogin?: string; // string | undefined
}

function getStatusColor(status: string) {
  switch (status) {
    case 'ACTIVE': return 'success';
    case 'INACTIVE': return 'destructive';
    default: return 'secondary';
  }
}

function ActionsCell({ row }: { row: Row<User> }) {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="sm" aria-label="Lihat detail">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" aria-label="Opsi lainnya">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function UsersTable({ users }: { users: User[] }) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('latest');

  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Filter berdasarkan status
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((user) =>
        selectedStatuses.includes(user.status)
      );
    }

    // Filter berdasarkan pencarian
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    // Urutkan berdasarkan sortOrder (berdasarkan createdAt)
    if (sortOrder === 'latest') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortOrder === 'oldest') {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return filtered;
  }, [users, searchQuery, selectedStatuses, sortOrder]);

  const statusCounts = useMemo(() => {
    return users.reduce(
      (acc, user) => {
        const status = user.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [users]);

  const handleStatusChange = (checked: boolean, value: string) => {
    setSelectedStatuses((prev = []) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataGridColumnHeader title="Name" column={column} />
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.original.name}</div>
        ),
        enableSorting: true,
        size: 200,
      },
      {
        accessorKey: 'email',
        header: ({ column }) => (
          <DataGridColumnHeader title="Email" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-gray-600">{row.original.email}</div>
        ),
        enableSorting: true,
        size: 250,
      },
      {
        accessorKey: 'role',
        header: ({ column }) => (
          <DataGridColumnHeader title="Role" column={column} />
        ),
        cell: ({ row }) => (
          <Badge variant="outline">{row.original.role}</Badge>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        accessorKey: 'status',
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => (
          <Badge variant={getStatusColor(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <DataGridColumnHeader title="Created" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-gray-600">{row.original.createdAt}</div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        accessorKey: 'lastLogin',
        header: ({ column }) => (
          <DataGridColumnHeader title="Last Login" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm text-gray-600">{row.original.lastLogin || '-'}</div>
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
    data: filteredUsers,
    pageCount: Math.ceil((filteredUsers?.length || 0) / pagination.pageSize),
    getRowId: (row: User) => row.id,
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
      recordCount={filteredUsers?.length || 0}
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
            <CardTitle>User Management</CardTitle>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Search users..."
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