import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input()
  message: string = ''

  @Input()
  isError: boolean = false

  isOpened:boolean = true
  mainColor:any = '#d9d9d9'

  constructor( public modalService: NgbModal ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  async closeModal(){
    this.modalService.dismissAll(ModalDismissReasons.BACKDROP_CLICK)
  }

}
