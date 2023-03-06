import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Theme } from '../response-models/theme.model';
import { ChangeUserTheme } from '../request-models/request-theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private _http: HttpClient) { }

  getAllThemes(): Observable<Theme>{
    return this._http.get<any>(
      environment.apiLocalhost + '/allThemes'
    ).pipe(map(result => result));
  }

  getThemeById(id:number): Observable<any>{
    return this._http.get<any>(
      environment.apiLocalhost + '/themeById/' + id
    ).pipe(map(result => result))
  }

  changeUserTheme(changeUserTheme:ChangeUserTheme){
    return this._http.post<ChangeUserTheme>(
      environment.apiLocalhost + '/changeUserTheme', changeUserTheme
    ).pipe(map(result => result))
  }
}
