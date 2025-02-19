import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { randomString } from '../../helpers/random.test';
import { buildFieldConfig } from '../field-config';
import { ComboEditControlComponent } from './combo-edit-control.component';

describe('ComboEditControlComponent', () => {
  let component: ComboEditControlComponent;
  let fixture: ComponentFixture<ComboEditControlComponent>;
  let loader: HarnessLoader;

  let translatePrefix: string;

  beforeEach(async () => {
    const formGroupDirective = new NgForm([], []);
    formGroupDirective.form = new FormGroup({});

    translatePrefix = randomString('Translate');

    await TestBed.configureTestingModule({
      imports: [
        ComboEditControlComponent,
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations('en', {
          'COMMON.SELECTEMPTYVALUE': `${translatePrefix}.Select`,
          'FIRST.VALUE': `${translatePrefix}.First`,
          'SECOND.VALUE': `${translatePrefix}.Second`,
        }),
      ],
      providers: [{ provide: NgForm, useValue: formGroupDirective }],
    }).compileComponents();

    fixture = TestBed.createComponent(ComboEditControlComponent);
    component = fixture.componentInstance;

    component.schema = {
      fieldName: 'testField',
      formName: 'testForm',
      options: [
        { value: 1, translationKey: 'FIRST.VALUE' },
        { value: 2, translationKey: 'SECOND.VALUE' },
      ],
    };

    component.config = {
      testField: buildFieldConfig(),
    };

    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select default value when value is undefined', async () => {
    const select = await loader.getHarness(MatSelectHarness);

    expect(await select.getValueText()).toBe(`${translatePrefix}.Select`);
  });

  it('should emit the value change when the option is selected', async () => {
    spyOn(component.valueChange, 'emit').and.callThrough();

    const select = await loader.getHarness(MatSelectHarness);

    await select.open();
    const options = await select.getOptions();

    await options[2].click();

    expect(await select.getValueText()).toBe(`${translatePrefix}.Second`);
    expect(component.valueChange.emit).toHaveBeenCalledOnceWith(2);
  });

  it('shoud emit null when the default option is selected', async () => {
    spyOn(component.valueChange, 'emit').and.callThrough();
    fixture.componentRef.setInput('value', 2);
    fixture.detectChanges();

    const select = await loader.getHarness(MatSelectHarness);

    await select.open();
    const options = await select.getOptions();

    await options[0].click();

    expect(await select.getValueText()).toBe(`${translatePrefix}.Select`);
    expect(component.valueChange.emit).toHaveBeenCalledOnceWith(null);
  });
});
