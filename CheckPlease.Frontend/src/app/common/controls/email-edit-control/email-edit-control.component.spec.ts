import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, UntypedFormGroup } from '@angular/forms';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { buildFieldConfig } from '../field-config';
import { EmailEditControlComponent } from './email-edit-control.component';
import { IEmailEditControlSchema } from './email-edit-control.schema';

describe('Given EmailEditControlComponent', () => {
  let component: EmailEditControlComponent<string | null | undefined>;
  let fixture: ComponentFixture<EmailEditControlComponent<string | null | undefined>>;
  let loader: HarnessLoader;

  const emailMock = {
    email: 'a@w.pl',
    isPrimary: true,
  };

  const schemaMock: IEmailEditControlSchema = {
    fieldName: 'mockEmail',
    formName: 'mockEmailForm',
    controlId: 'mockEmail',
    translationKey: 'emailTranslationKey',
  };

  const configMock = {
    mockEmail: buildFieldConfig().isRequired(),
  };

  beforeEach(async () => {
    const formGroupDirective = new NgForm([], []);
    formGroupDirective.form = new UntypedFormGroup({});

    await TestBed.configureTestingModule({
      imports: [EmailEditControlComponent, NoopAnimationsModule],
      providers: [{ provide: NgForm, useValue: formGroupDirective }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditControlComponent);
    component = fixture.componentInstance;
    component.schema = schemaMock;
    component.config = configMock;
    component.emailAddress = emailMock.email;
    component.isPrimary = emailMock.isPrimary;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('when is rendered', () => {
    it('when email is primary than displays a star for primary item', async () => {
      const icons = await loader.getAllHarnesses(MatIconHarness);

      // Assert
      expect(icons.length).toEqual(1);
    });

    it('when email is not primary than no star is displayed', async () => {
      component.isPrimary = false;
      fixture.detectChanges();

      const icons = await loader.getAllHarnesses(MatIconHarness);

      // Assert
      expect(icons.length).toEqual(0);
    });

    it('when email is required and empty email then validation error', async () => {
      // Arrange
      component.emailAddress = '';
      fixture.detectChanges();
      const input = await loader.getHarness(MatInputHarness);
      const formField = await loader.getHarness(MatFormFieldHarness);

      // Act
      await input.blur();

      // Assert
      expect(await formField.isControlValid()).toBe(false);
    });

    describe('when email address is typed', () => {
      const invalidCases: string[] = [
        'test',
        'test@test',
        'test@test.c',
        'test@#test.pl',
        'test@te  st.pl',
        'test@test.p l',
        'test@test.p9l',
        "test@testo'test.com",
        'test@test@test.com',
        'test test@test.com',
      ];

      invalidCases.forEach((emailAddress) => {
        it(`in the following format ${emailAddress} then e-mail should be of invalid format`, async () => {
          // Arrange
          component.emailAddress = emailAddress;

          const input = await loader.getHarness(MatInputHarness);
          const formField = await loader.getHarness(MatFormFieldHarness);

          await input.blur();

          // Assert
          expect(await formField.isControlValid()).toBe(false);
        });
      });

      const validCases: string[] = [
        'test-@test.co',
        'test999@test.co',
        '_test@test.co',
        'test@test.co',
        'test@test.com',
        'test@test.london',
        "testo'test@test.co.uk",
        'mrs.test@test.co.uk',
      ];

      validCases.forEach((emailAddress) => {
        it(`in the following format ${emailAddress} then e-mail should be of valid format`, async () => {
          // Arrange
          component.emailAddress = emailAddress;

          const input = await loader.getHarness(MatInputHarness);
          const formField = await loader.getHarness(MatFormFieldHarness);

          await input.blur();

          // Assert
          expect(await formField.isControlValid()).toBe(true);
          expect(await formField.getTextErrors()).toEqual([]);
        });
      });
    });
  });
});
