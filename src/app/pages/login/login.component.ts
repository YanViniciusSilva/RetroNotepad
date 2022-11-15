import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/request-models/authUser.model';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl(
    null,
    [
      Validators.required,
      Validators.email
    ]
  )
  password = new FormControl(
    null,
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]
  )

  loginData: AuthUser = {
    Email: '',
    Password: ''
  }

  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.removeCasheUser()
  }

  ngAfterViewInit(){
    this.setStyles()
  }

  setStyles(){
    let mainColor:any = environment.appColor
    if(mainColor == null || mainColor == undefined){
      mainColor = '#FED8E0'
    }
    document.body.style.backgroundColor = mainColor;
  }

  async verifyUser(){
    if(this.email.invalid || this.password.invalid){
      return this._modalService.showAlertModal("Campos vazios ou inválidos", false)
    }else{
      this.loginData.Email = this.email.value
      this.loginData.Password = this.password.value
    }

    try{
      await this._userService.authUser(this.loginData).then(async response => {
        if(response.status == 201){
          this._router.navigate(['home'])
          localStorage.setItem('Email', this.loginData.Email)
        }
      })
    }catch(erro:any){
      this._modalService.showAlertModal(erro.error.message, true)
    }finally{
      // this._loaderService.hideLoader()
    }
  }

  removeCasheUser(){
    localStorage.removeItem("Email")
  }
}
