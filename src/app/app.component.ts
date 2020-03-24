import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ModalComponent} from './movies-gallery/modal/modal.component';
import {RegistrationModalComponent} from './auth/registration-modal/registration-modal.component';
import {LoginModalComponent} from './auth/login-modal/login-modal.component';
import {AuthService} from './services/auth.service';
import {EditModalComponent} from './movies-gallery/edit-modal/edit-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,
              public authService: AuthService) {
  }
  ngOnInit() {
    this.authService.isAuth = localStorage.getItem('isAuth');
    this.authService.userName = localStorage.getItem('userName');
    this.authService.userEmail = localStorage.getItem('userEmail');
  }

  login() {
      this.modalRef = this.modalService.show(LoginModalComponent, {
        animated: false
      });
    }

  registration() {
    this.modalRef = this.modalService.show(RegistrationModalComponent, {
      animated: false
    });
  }

  signOut() {
    // @ts-ignore
    this.authService.isAuth = localStorage.setItem('isAuth', 'notAuth');
    window.location.reload();
  }

  changeName() {
    this.modalRef = this.modalService.show(EditModalComponent, {
      animated: false
    });
  }
}
