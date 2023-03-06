import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { SettingsModalComponent } from '../global-modules/settings-modal/settings-modal.component';
import { AlertModalComponent } from '../global-modules/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor( private _modalService: NgbModal) { }

  showSettingsModal(){
    const modalRef = this._modalService.open(SettingsModalComponent)
  }

  showAlertModal(message:string, isError: boolean){
    const modalRef = this._modalService.open(AlertModalComponent)
    modalRef.componentInstance.message = message
    modalRef.componentInstance.isError = isError
  }
}
