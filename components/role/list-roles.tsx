'use client';
import { useTranslation } from 'react-i18next';
import { IRole } from '@/models/role.model';
import { Column } from '@/models/data.model';
import DataList from '@/components/table/data-list';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PencilRuler, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RoleForm } from '@/components/role/role-form';

interface ListRolesProps {
  data: IRole[];
}

export function ListRoles({ data: initialRoles }: ListRolesProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [roles, setRoles] = useState<IRole[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<IRole | null>(null);

  const handleRefresh = () => {
    router.refresh();
  };

  const handleEdit = (role: IRole) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleDelete = (role: IRole) => {
    setRoleToDelete(role);
    setIsDeleteDialogOpen(true);
    confirmDelete().then()
    console.log(isDeleteDialogOpen);
  };

  const confirmDelete = async () => {
    if (!roleToDelete) return;

    try {
      toast.success(t('Đã xóa quyền thành công'));
      handleRefresh();
    } catch (error) {
      console.error('Lỗi khi xóa quyền:', error);
      toast.error(t('Đã xảy ra lỗi khi xóa quyền'));
    } finally {
      setIsDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedRole(null);
  };

  const columns: Column<IRole>[] = [
    { title: t('i_level'), key: 'level' },
    { title: t('i_name_role'), key: 'name' },
    { title: t('i_title'), key: 'title' },
    {
      title: t('i_edit2'), key: 'name', render: (_, val: IRole) => (
        <div className="flex flex-row gap-2">
          <PencilRuler
            onClick={() => handleEdit(val)}
            className={"opacity-60 hover:opacity-100 cursor-pointer transition-opacity"} />
          <Trash2
            onClick={() => handleDelete(val)}
            className={"text-red-500 opacity-70 hover:opacity-100 cursor-pointer transition-opacity"} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-1 flex-col w-full gap-4 p-4">
      <div className="flex flex-row w-full items-center justify-between gap-2">
        <div>
          <Button onClick={() => router.back()} className={'cursor-pointer'} variant="outline">
            <ChevronLeft className="mr-1 h-4 w-4" />
            {t('i_back')}
          </Button>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <Button className={"cursor-pointer"} onClick={() => {
            setSelectedRole(null);
            setIsFormOpen(true);
          }}>{t('i_create_role')}</Button>
          <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
            <SheetTrigger asChild
                          onClick={() => setSelectedRole(null)}
                          className={'cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'}>
              {t('i_create_role')}
            </SheetTrigger>
            <SheetContent className={"p-3"}>
              <SheetHeader>
                <SheetTitle>{selectedRole ? t('i_edit_role') : t('i_create_role')}</SheetTitle>
              </SheetHeader>
              <RoleForm
                defaultValues={selectedRole || undefined}
                onSuccess={(role: IRole) => {
                  const _role: IRole[] = []
                  setRoles([])
                  let isEdit = false;
                  for (const r of roles) {
                    if (r._id !== role._id) _role.push(r);
                    else {
                      _role.push(role);
                      isEdit = true;
                    }
                  }
                  if (!isEdit) _role.push(role);
                  setRoles(_role);
                  handleRefresh();
                  handleFormClose();
                }}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {roles && roles.length > 0 ?
        <DataList data={roles} columns={columns} pagination={{
          page_total: 1,
          page_size: roles.length,
          page_index: 1,
          total: roles.length,
        }
        } cb={() => {
        }} />
        : <div>No roles</div>}
    </div>
  );


}