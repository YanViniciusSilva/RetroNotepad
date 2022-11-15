import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../users.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate{
  constructor(
    private _router: Router,
    private _userService: UsersService
  ){}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    let email = localStorage.getItem("Email")
    let user:any
    if(email == null){
      this._router.navigate(['/'])
      return false
    } else {
      await this._userService.getUserByEmail(email).then(result => {
        user = result
      })

      if(user == null || user == undefined){
        return false
      }

    }

    return true

  }

}
