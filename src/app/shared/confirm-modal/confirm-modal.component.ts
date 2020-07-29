import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() okTxt = 'Ok';
  @Input() cancelTxt = 'Cancelar';

  confirmResult: Subject<boolean>;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  onClose() {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }

}
