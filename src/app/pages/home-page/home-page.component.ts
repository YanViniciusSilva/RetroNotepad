import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';


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
  mainColor = environment.appColor;

  constructor(
    private _modalService : ModalService,
    private _usersService: UsersService
  ) {
    if(localStorage.getItem("color") == undefined){
      const color = localStorage.setItem('color', '#FED8E0')
    }
  }

  ngOnInit(): void {
    // this.getActiveUser()
  }

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
    const mainColor:any = environment.appColor
    document.body.style.backgroundColor = mainColor;
  }

  openSettingsModal(){
    this._modalService.showModal()
  }
}
