import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnum } from '../enums/role.enum';

@Pipe({
  name: 'roleName',
  standalone: true,
})
export class RoleNamePipe implements PipeTransform {
  private roleNames: Record<RoleEnum, string> = {
    [RoleEnum.Guest]: 'Guest',
    [RoleEnum.Student]: 'Student',
    [RoleEnum.Manager]: 'Manager',
    [RoleEnum.Admin]: 'Admin',
  };

  public transform(role: RoleEnum): string {
    return this.roleNames[role] || 'Unknown Role';
  }
}
