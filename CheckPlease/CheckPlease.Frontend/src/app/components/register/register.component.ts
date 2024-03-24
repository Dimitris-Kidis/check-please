import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForAuthenticationDto, UserForRegistrationDto } from 'src/models/auth';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'check-please-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('inputEmail') public inputEmail!: ElementRef;
  @ViewChild('invalidLogin') public loginErrorMessage!: ElementRef;
  @ViewChild('image') public image!: ElementRef;

  public emailPlaceholderText: string = 'text';
  public registerForm!: FormGroup;
  public errorFlag: boolean = false;
  public error: string = '';

  public constructor(
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    });
  }

  public register = async (registrationFormValue: any): Promise<any> => {
    const register = { ...registrationFormValue };
    const userRegisters: UserForRegistrationDto = {
      email: register.email,
      password: register.password,
    };
    this._authService.registerUser(userRegisters).subscribe({
      next: (_: any) => {
        const userForAuth: UserForAuthenticationDto = {
          email: userRegisters.email,
          password: userRegisters.password,
        };
        this._authService.loginUser(userForAuth).subscribe({
          next: async (respone: any) => {
            localStorage.setItem('token', respone.token);
            this._router.navigate(['/menu']).then(() => {
              window.location.reload();
            });
          },
          error: async () => {
            await changeContent(this, 'Ошибка. Проверьте почту или пароль');
            await delay(5000);
            await changeContent(this, '');
          },
        });
      },
    });
  };
}

function delay(ms: number): unknown {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string): void {
  obj.loginErrorMessage.nativeElement.innerHTML = `${content}`;
}
