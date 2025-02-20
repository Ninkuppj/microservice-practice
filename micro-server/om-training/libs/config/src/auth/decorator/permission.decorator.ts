import { SetMetadata } from '@nestjs/common';

export const Permission = ( roles: number[], permissions: string[]) =>
  SetMetadata('authorization', {roles, permissions});