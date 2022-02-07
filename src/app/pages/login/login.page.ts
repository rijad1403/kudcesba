import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../../shared/services/login.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async login() {
    const loginCredentials = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginService.login(loginCredentials).subscribe(async (data) => {
      if (data.errors) {
        const toast = await this.toastController.create({
          message: 'Unešeni podaci nisu validni.',
          duration: 3000,
          color: 'danger',
        });
        await toast.present();
      } else {
        localStorage.setItem('token', data.auth_key);
        this.userService.getMyProfile().subscribe(async (userData) => {
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.loginService.checkLoggedIn(true);
          await this.router.navigate(['/user/profile']);
        });
      }
    });
  }
}
