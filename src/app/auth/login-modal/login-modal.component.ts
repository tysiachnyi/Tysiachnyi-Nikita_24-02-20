import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  localAutInfo: any[];
  isAuth: boolean | string = false;
  form: FormGroup;
  constructor(
      public modalRef: BsModalRef,
      public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
      const localStorageData = JSON.parse(localStorage.getItem(formData.email));
      if (localStorageData[1] ===  formData.password) {
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userName', localStorageData[0]);
        localStorage.setItem('isAuth', 'auth');
        this.authService.isAuth = localStorage.getItem('isAuth');
        this.form.reset();
        this.modalRef.hide();
        window.location.reload();
      } else {
        console.log(formData.password);
        console.log(localStorageData[1]);
      }
    }

  }
}
