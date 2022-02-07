import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IPasswordUpdate } from '../../../shared/models/user/password-update';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage implements OnInit {
  passwordUpdateForm: FormGroup;
  contentLoaded: boolean;

  constructor(
    private userService: UserService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.contentLoaded = true;
    this.passwordUpdateForm = new FormGroup({
      // currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      newPasswordConfirmation: new FormControl('', [Validators.required]),
    });
  }

  updatePassword() {
    const passwordUpdate: IPasswordUpdate = {
      UserResetPasswordForm: {
        password: this.passwordUpdateForm.value.newPassword,
        confirm_password: this.passwordUpdateForm.value.newPasswordConfirmation,
      },
    };
    this.userService.updatePassword(passwordUpdate).subscribe(async (value) => {
      if (value) {
        this.passwordUpdateForm.reset();
        const toast = await this.toastController.create({
          message: 'Uspješno ažuriranje lozinke.',
          duration: 3000,
          color: 'success',
        });
        await toast.present();
      } else {
        const toast = await this.toastController.create({
          message: 'Neuspješno ažuriranje lozinke.',
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
      }
    });
  }
}
