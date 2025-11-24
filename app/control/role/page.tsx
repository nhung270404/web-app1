import { getAllRoles } from '@/lib/services/role.service';
import React from 'react';
import { ListRoles } from '@/components/role/list-roles';


export default async function RolePage() {
  const roles = await getAllRoles();

  return <ListRoles data={roles} />
}