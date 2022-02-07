import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PersonalInfoModalComponent } from '../../../partials/personal-info-modal/personal-info-modal.component';
import { PersonalInfo } from '../../../shared/models/user/personal-info';
import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  currentUser: any;
  personalInfoForm: FormGroup;
  countryPrefixes: any[];
  contentLoaded = false;
  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.commonService.getPhonePrefixes().subscribe((data) => {
      this.countryPrefixes = data;
      this.contentLoaded = true;
      this.personalInfoForm = new FormGroup({
        firstName: new FormControl(this.currentUser.first_name, [
          Validators.required,
        ]),
        lastName: new FormControl(this.currentUser.last_name, [
          Validators.required,
        ]),
        facebookProfile: new FormControl(this.currentUser.facebook_profile),
        phone: new FormControl(this.currentUser.phone, [Validators.required]),
        phonePrefix: new FormControl(this.currentUser.phone_prefix, [
          Validators.required,
        ]),
      });
    });
  }

  submitForm() {
    const prefix = this.countryPrefixes.find(
      (cp) => cp.prefix == this.personalInfoForm.value.phonePrefix
    );

    let personalInfo: PersonalInfo = {
      first_name: this.personalInfoForm.value.firstName,
      last_name: this.personalInfoForm.value.lastName,
      facebook_profile: this.personalInfoForm.value.facebookProfile,
      phone: this.personalInfoForm.value.phone,
      phone_prefix_id: prefix.id,
    };
    console.log(personalInfo);

    this.userService.update(personalInfo).subscribe((data) => {
      if (data) {
        this.userService.getMyProfile().subscribe((userData) => {
          localStorage.setItem('currentUser', JSON.stringify(userData));
        });
      }
    });
  }

  async presentModal(input: string) {
    const modal = await this.modalController.create({
      component: PersonalInfoModalComponent,
      componentProps: {
        input,
      },
    });
    await modal.present();
  }
}
