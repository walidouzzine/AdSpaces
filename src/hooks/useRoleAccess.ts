import { useAuthStore } from '../store/authStore';
import { User } from '../types';

type Permission = 
  | 'dashboard.view'
  | 'dashboard.manage'
  | 'adspace.create'
  | 'adspace.edit'
  | 'adspace.delete'
  | 'adspace.view'
  | 'users.manage'
  | 'myboard.view';

type RolePermissions = {
  [key in User['role']]: Permission[];
};

const ROLE_PERMISSIONS: RolePermissions = {
  admin: [
    'dashboard.view',
    'dashboard.manage',
    'adspace.create',
    'adspace.edit',
    'adspace.delete',
    'adspace.view',
    'users.manage'
  ],
  owner: [
    'myboard.view',
    'adspace.create',
    'adspace.edit',
    'adspace.delete',
    'adspace.view'
  ],
  client: [
    'adspace.view'
  ]
};

export const useRoleAccess = () => {
  const { user } = useAuthStore();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission) || false;
  };

  const isAdmin = (): boolean => user?.role === 'admin';
  const isOwner = (): boolean => user?.role === 'owner';
  const isClient = (): boolean => user?.role === 'client';

  return {
    hasPermission,
    isAdmin,
    isOwner,
    isClient
  };
};