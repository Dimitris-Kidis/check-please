import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForAuthenticationDto } from 'src/models/auth';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailPlaceholderText: string = 'text'
  loginForm!: FormGroup;
  private _returnUrl!: string;
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
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required,
                                     Validators.minLength(5),
                                     Validators.maxLength(30)]),
      password: new FormControl("", [Validators.required,
                                     Validators.minLength(8),
                                     Validators.maxLength(20)])
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  
  @ViewChild('invalidLogin') loginErrorMessage!: ElementRef;
  @ViewChild('image') image!: ElementRef;
  
  
  login = async (loginFormValue: any) => {
    console.log(this.loginForm);
    const login = { ...loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.email,
      password: login.password
    }
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
  }
}

function delay(ms: number) {
return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
  obj.loginErrorMessage.nativeElement.innerHTML = `${content}`;
}
