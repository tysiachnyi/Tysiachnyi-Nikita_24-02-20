import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  form: FormGroup;
  modalRef: BsModalRef;

  constructor(
      public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [])
    });
  }


  submit() {
    const formData = {...this.form.value};
    localStorage.setItem('userName', formData.name);
    const oldFav = JSON.parse(localStorage.getItem(this.authService.userName));
    localStorage.removeItem(this.authService.userName);
    localStorage.setItem(formData.name, JSON.stringify(oldFav));
    let newState = JSON.parse(localStorage.getItem(this.authService.userEmail));
    newState = newState.map((item) =>  item === this.authService.userName ? formData.name : item );
    localStorage.setItem(this.authService.userEmail, JSON.stringify(newState));
    this.form.reset();
    window.location.reload();
  }
}
