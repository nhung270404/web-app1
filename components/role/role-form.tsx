'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SheetFooter } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { IRole } from '@/models/role.model';
import { POST_METHOD, PUT_METHOD } from '@/lib/req';

// Định nghĩa schema validation
const roleFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Tên quyền phải có ít nhất 2 ký tự',
  }),
  title: z.string().min(2, {
    message: 'Tiêu đề phải có ít nhất 2 ký tự',
  }),
  level: z.coerce.number().min(1, {
    message: 'Cấp độ phải lớn hơn hoặc bằng 1',
  }).max(10, {
    message: 'Cấp độ không được vượt quá 10',
  }),
});

interface RoleFormProps {
  defaultValues?: IRole;
  onSuccess?: (role: IRole) => void;
}

export function RoleForm({ defaultValues, onSuccess }: RoleFormProps) {
  const { t } = useTranslation();
  const isEditing = !!defaultValues?._id;

  const form = useForm<z.infer<typeof roleFormSchema>>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      title: defaultValues?.title || '',
      level: defaultValues?.level || 1,
    },
  });

  async function onSubmit(values: z.infer<typeof roleFormSchema>) {
    try {
      let role: IRole
      if (isEditing) {
        role = await PUT_METHOD(`/api/role/${defaultValues?._id}`, values);
        toast.success(t('i_update_role_success'));
      } else {
        role = await POST_METHOD('/api/role', values);
        toast.success(t('i_create_role_success'));
      }
      if (onSuccess) {
        form.reset();
        role._id = role._id ? role._id.toString() : role._id;
        onSuccess(role);
      }
    } catch (error) {
      console.error(t('i_error_saving_role_console'), error);
      toast.error(t('i_error_saving_role'));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('i_name_role')}</FormLabel>
              <FormControl>
                <Input placeholder="admin" {...field} />
              </FormControl>
              <FormDescription>
                {t('Tên quyền không có dấu cách, dùng để nhận diện trong hệ thống')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('i_title')}</FormLabel>
              <FormControl>
                <Input placeholder="Quản trị viên" {...field} />
              </FormControl>
              <FormDescription>
                {t('Tiêu đề hiển thị cho người dùng')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('i_level')}</FormLabel>
              <FormControl>
                <Input type="number" min={1} max={10} {...field} />
              </FormControl>
              <FormDescription>
                {t('Cấp độ quyền từ 1-10, càng thấp càng cao quyền')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SheetFooter className="pt-4">
          <Button type="submit">
            {isEditing ? t('Cập nhật quyền') : t('i_create_role')}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}