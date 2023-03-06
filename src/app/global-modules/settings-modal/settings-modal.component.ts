import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/services/modal.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UsersService } from 'src/app/services/users.service';

import { ChangeUserTheme } from './../../request-models/request-theme.model';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  mainColor:any
  themes:any

  selectedColor = new FormControl(null)

  constructor(
    public _ngbModal: NgbModal,
    private _modalService : ModalService,
    private _themeService: ThemeService,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getAppThemes()
    this.getUserAppTheme()
  }

  getAppThemes(){
    this._themeService.getAllThemes().forEach(value => {
      this.themes = value
    })
  }

  getUserAppTheme(){
    const activeUser:any = localStorage.getItem('Email')
    this._usersService.getUserByEmail(activeUser).then(result => {
      this._themeService.getThemeById(result.AppTheme).subscribe(response => {
        this.selectedColor.setValue(response.ThemeColor)
        this.mainColor = response.ThemeColor
      })
    })
  }

  changeAppColor(_event: any){
    const email:any = localStorage.getItem('Email')
    const changeRequest:ChangeUserTheme = {
      Email: email,
      AppTheme: 0
    }
    for(let theme of this.themes){
      if(theme?.ThemeColor == this.selectedColor.value){
        changeRequest.AppTheme = theme.ThemeId
        this._themeService.changeUserTheme(changeRequest).subscribe(() => {
          localStorage.setItem('color', this.selectedColor.value!)
          window.location.reload()
        })
      }
    }
  }

  openSettingsModal(){
    this._modalService.showSettingsModal()
  }

  async closeModal(){
    this._ngbModal.dismissAll(ModalDismissReasons.BACKDROP_CLICK)
  }
}
