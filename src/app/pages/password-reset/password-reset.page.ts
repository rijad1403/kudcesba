import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  passwordResetForm: FormGroup;
  constructor() {}

  ngOnInit() {
    this.passwordResetForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  resetPassword() {
    console.log(this.passwordResetForm.value);
  }
}
