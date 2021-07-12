import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage implements OnInit {
  passwordUpdateForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.passwordUpdateForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      newPasswordConfirmation: new FormControl('', [Validators.required]),
    });
  }

  updatePassword() {
    console.log(this.passwordUpdateForm);
  }
}
