import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../request-models/authUser.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers(): Promise<any>{
    return firstValueFrom(
      this._http.get<any>(
        environment.apiLocalhost + '/allUsers'
      ).pipe(map(result => result))
    )
  }

  getUserByEmail(email: string): Promise<any>{
    return firstValueFrom(
      this._http.get<any>(
        environment.apiLocalhost + '/userByEmail/' + email
      ).pipe(map(result => result))
    )
  }

  authUser(authUser: AuthUser): Promise<any>{
    return firstValueFrom(
      this._http.post<any>(
        environment.apiLocalhost + '/authUser', authUser
      ).pipe(map(result => result))
    )
  }
}
