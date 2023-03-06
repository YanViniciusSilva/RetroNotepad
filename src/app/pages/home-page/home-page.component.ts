import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  tasks = [
    {title:'Fazer compras', isComplete: true},
    {title:'Beber água', isComplete: false},
    {title:'Mandar mensagem clientes', isComplete:false},
  ]

  position:string = ''

  actualPosition:any = [];
  closeResult = ''
  mainColor:any

  constructor(
    private _modalService : ModalService,
    private _usersService: UsersService,
    private _themeService: ThemeService,
  ) {
    if(localStorage.getItem("color") == undefined){
      const color = localStorage.setItem('color', this.mainColor)
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(){
    this.setStyles()
  }

  async getActiveUser(){
    const email = localStorage.getItem("Email")

    if(email)
    await this._usersService.getUserByEmail(email).then(result => {
      console.log(result)
    })
  }

  setStyles(){
    const activeUser:any = localStorage.getItem('Email')
    this._usersService.getUserByEmail(activeUser).then(result => {
      this._themeService.getThemeById(result.AppTheme).subscribe(response => {
        this.mainColor = response.ThemeColor
        document.body.style.backgroundColor = this.mainColor;
      })
    })
  }

  openSettingsModal(){
    this._modalService.showSettingsModal()
  }
}
