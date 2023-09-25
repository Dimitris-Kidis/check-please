import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserForAuthenticationDto, UserForRegistrationDto } from 'src/models/auth';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailPlaceholderText: string = 'text'
  registerForm!: FormGroup;
  errorFlag: boolean = false;
  error: string = '';

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _route: ActivatedRoute
  ){}

  @ViewChild('inputEmail') inputEmail!: ElementRef;

  ngOnInit(): void {
    // if (this._authService.isLoggedIn()) this._router.navigate(['/typo/main']);
    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required,
                                     Validators.minLength(5),
                                     Validators.maxLength(30)]),
      password: new FormControl("", [Validators.required,
                                     Validators.minLength(8),
                                     Validators.maxLength(20)])
    });
  }

  
  @ViewChild('invalidLogin') loginErrorMessage!: ElementRef;
  @ViewChild('image') image!: ElementRef;
  
  
  register = async (registrationFormValue: any) => {
    const register = { ...registrationFormValue };
    const userRegisters: UserForRegistrationDto = {
      email: register.email,
      password: register.password
    }
    this._authService.registerUser(userRegisters)
      .subscribe({
        next: (_: any) => {
          const userForAuth: UserForAuthenticationDto = {
            email: userRegisters.email,
            password: userRegisters.password
          };
          this._authService.loginUser(userForAuth)
      .subscribe({
      next: async (respone: any) => {
        localStorage.setItem("token", respone.token);
        this._router.navigate(['/menu']).then(() => {
           window.location.reload();
        });
      },
      error:
        async () => {
          await changeContent(this, 'Ошибка. Проверьте почту или пароль');
          await delay(5000);
          await changeContent(this, '');
        }
    });
        },
      });
  }
}

function delay(ms: number) {
return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
  obj.loginErrorMessage.nativeElement.innerHTML = `${content}`;
}
