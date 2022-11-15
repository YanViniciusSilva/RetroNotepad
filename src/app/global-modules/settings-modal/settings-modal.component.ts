import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  isOpened:boolean = true
  mainColor:any = environment.appColor
  mainColorName:string = ''
  colors = [
    {color:'Rosa', value:'#FED8E0'},
    {color:'Verde', value:'#d8fed9'},
    {color:'Azul', value:'#d9d8fe'},
    {color:'Amarelo', value:'#fcffa8'},
  ]

  selectedColor = new FormControl(environment.appColor)

  constructor( public modalService: NgbModal ) {
    const color = localStorage.setItem('color', this.selectedColor.value!.toString())
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  changeAppColor(_event: any){
    const color:any = this.selectedColor.value
    localStorage.setItem('color', color)
    window.location.reload()
    environment.appColor = color
    console.log(environment.appColor)
  }

  async closeModal(){
    this.modalService.dismissAll(ModalDismissReasons.BACKDROP_CLICK)
  }
}
