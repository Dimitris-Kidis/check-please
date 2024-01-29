import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { RegistrationResponseDto, UserForAuthenticationDto, UserForRegistrationDto } from 'src/models/auth';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public _authChangeSub = new Subject<boolean>();
  public authChanged = this._authChangeSub.asObservable();

  public constructor(
    private _http: HttpClient,
    // private userService: UsersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  public sendAuthStateChangeNotification = (isAuthenticated: boolean): void => {
    this._authChangeSub.next(isAuthenticated);
  };

  public loginUser(dto: UserForAuthenticationDto): Observable<any> {
    return this._http.post<any>('api/auth/login', dto);
  }

  public registerUser(dto: UserForRegistrationDto): Observable<any> {
    return this._http.post<RegistrationResponseDto>('api/auth/registration', dto);
  }

  public logOut(): Observable<any> {
    localStorage.removeItem('token');
    return this._http.post('api/auth/logout', {});
  }

  public isLoggedIn(): boolean {
    const token: any = localStorage.getItem('token'); // get token from local storage
    if (token) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object
      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    } else {
      return false;
    }
  }

  public getUserId(): number {
    const token: any = localStorage.getItem('token');
    return parseInt(this.parseJwt(token).id);
  }

  public getUserdata(): Observable<User> {
    const token: any = localStorage.getItem('token');
    const id: string = this.parseJwt(token).id;
    return this._http.get<User>(`api/users/${id}`);
  }

  public parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }
}
