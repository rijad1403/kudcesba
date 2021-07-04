import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async login() {
      const user = { username: this.loginForm.value.email, password: this.loginForm.value.password };

      this.loginService.login(user).subscribe(data=>{
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('token', data.auth_key);
        this.router.navigate(['/home']);
      }, async error=>{
        const toast = await this.toastController.create({
          message: 'Unešeni podaci nisu validni.',
          duration: 5000,
          color: 'danger',
        });
        toast.present();
      })
    
  }
}
