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
    console.log(formData);
    localStorage.setItem('userName', formData.name);
    let newState = JSON.parse(localStorage.getItem(this.authService.userEmail));
    newState = newState.map((item) =>  item === this.authService.userName ? formData.name : item );
    // tslint:disable-next-line:no-debugger
    debugger;
    console.log(newState)
    localStorage.setItem(this.authService.userEmail, JSON.stringify(newState));
    this.form.reset();
    window.location.reload();
  }
}
