// import {
//   AfterViewInit,
//   ChangeDetectionStrategy,
//   Component,
//   DestroyRef,
//   EventEmitter,
//   Input,
//   OnChanges,
//   Output,
//   SimpleChanges,
//   ViewChild,
// } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { FormsModule } from '@angular/forms';
// import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { CONTROL_CONTAINER_PROVIDER } from '../control-container-provider';
// import { ITextEditControlSchema } from '../text-edit-control/text-edit-control.schema';
// import { SharedModule } from '../../../shared/shared.module';

// @Component({
//   selector: 'check-please-predefined-text-edit-control',
//   standalone: true,
//   imports: [SharedModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
//   templateUrl: './predefined-text-edit-control.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   viewProviders: [CONTROL_CONTAINER_PROVIDER],
// })
// export class PredefinedTextEditControlComponent<T extends string | null | undefined>
//   implements OnChanges, AfterViewInit
// {
//   @Input() public schema: ITextEditControlSchema;
//   @Input() public config: any;

//   @Input() public options: IDetailOption[];

//   @Input() public value: T;
//   @Output() public valueChange = new EventEmitter<T>();

//   @Output() public selectItem = new EventEmitter<IDetailOption | null>();

//   @ViewChild(MatAutocompleteTrigger) public matAutocompleteTrigger?: MatAutocompleteTrigger;

//   public filteredOptions: IDetailOption[];

//   public constructor(private readonly destroyRef: DestroyRef) {}

//   public ngOnChanges(changes: SimpleChanges): void {
//     if (changes['value']) {
//       this.filteredOptions = this.filter(changes['value'].currentValue || '');
//     }
//   }

//   public ngAfterViewInit(): void {
//     this.matAutocompleteTrigger?.panelClosingActions.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((option) => {
//       if (!option) {
//         this.selectItem.emit(null);
//       }
//     });
//   }

//   private filter(value: string): IDetailOption[] {
//     const filterValue = value.toLowerCase();

//     return this.options.filter((option) => option.detailName.toLowerCase().includes(filterValue));
//   }
// }

// export interface IPredefinedTextOption {
//   text: string;
// }
