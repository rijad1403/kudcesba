import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async login() {
    if (
      this.loginForm.value.email === 'user' &&
      this.loginForm.value.password === '12345'
    ) {
      const user = { email: 'user', password: '12345' };
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/home']);
    } else {
      const toast = await this.toastController.create({
        message: 'Unešeni podaci nisu validni.',
        duration: 5000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
