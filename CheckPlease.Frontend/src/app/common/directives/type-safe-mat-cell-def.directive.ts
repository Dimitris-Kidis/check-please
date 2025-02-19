import { CdkCellDef, DataSource } from '@angular/cdk/table';
import { Directive, Input } from '@angular/core';
import { MatCellDef } from '@angular/material/table';
import { Observable } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matCellDef]', // same selector as MatCellDef
  providers: [{ provide: CdkCellDef, useExisting: TypeSafeMatCellDefDirective }],
  standalone: true,
})
export class TypeSafeMatCellDefDirective<T> extends MatCellDef {
  // leveraging syntactic-sugar syntax when we use *matCellDef
  @Input() public matCellDefDataSource: T[] | Observable<T[]> | DataSource<T>;

  // ngTemplateContextGuard flag to help with the Language Service
  public static ngTemplateContextGuard<T>(
    dir: TypeSafeMatCellDefDirective<T>,
    ctx: unknown,
  ): ctx is { $implicit: T; index: number; dataIndex: number } {
    return true;
  }
}
