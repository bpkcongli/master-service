interface PermissionVerificatorProps {
  permissions: string[];
  baseUrl: string;
  relativeUrl: string;
  method: string;
  params: Record<string, string>;
}

export default PermissionVerificatorProps;
