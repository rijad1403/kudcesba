import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IRegisterForm } from 'src/app/shared/models/user/register-form';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private registerService: RegisterService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      facebookProfile: new FormControl(''),
      phonePrefixId: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      termsAndConditions: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  submitForm() {
    console.log(this.registerForm);
    const registerForm: IRegisterForm = {
      first_name: this.registerForm.value.firstName,
      last_name: this.registerForm.value.lastName,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      facebook_profile: this.registerForm.value.facebookProfile,
      phone_prefix_id: +this.registerForm.value.phonePrefixId,
      phone: `${this.registerForm.value.phone}`,
      agree_with_tc: this.registerForm.value.termsAndConditions,
    };
    this.registerService.register(registerForm).subscribe(
      async (value) => {
        if (value == true) {
          const toast = await this.toastController.create({
            message: 'Registracija uspješna.',
            duration: 3000,
            color: 'success',
          });
          await toast.present();
          this.registerForm.reset();
        } else {
          let emailValidation = '';
          if (value.errors.email) {
            emailValidation = `Email "${registerForm.email}" je zauzet.`;
          }
          let facebookValidation = '';
          if (value.errors.facebook_profile) {
            facebookValidation = `Facebook profil "${registerForm.facebook_profile}" je zauzet.`;
          }
          let usernameValidation = '';
          if (value.errors.username) {
            usernameValidation = `Username "${registerForm.username}" je zauzet.`;
          }
          const toast = await this.toastController.create({
            message: `${emailValidation}\n${facebookValidation}\n${usernameValidation}`,
            duration: 3000,
            color: 'danger',
          });
          await toast.present();
        }
      },
      async (error) => {
        const toast = await this.toastController.create({
          message: 'Unešeni podaci nisu validni.',
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
      }
    );
  }
}
