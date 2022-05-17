interface PermissionVerificatorProps {
  permissions: string[];
  relativeUrl: string;
  method: string;
  params: Record<string, string>;
}

interface PermissionACL {
  endpoint: string;
  permission: string;
}

export {PermissionVerificatorProps, PermissionACL};
