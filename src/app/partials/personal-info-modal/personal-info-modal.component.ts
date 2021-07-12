import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-personal-info-modal',
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.scss'],
})
export class PersonalInfoModalComponent implements OnInit {
  @Input() input: string;
  text: string;
  placeholder: string;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    switch (this.input) {
      case 'firstName':
        this.text = 'Koje je tvoje ime?';
        this.placeholder = 'Ime';
        break;
      case 'lastName':
        this.text = 'Koje je tvoje prezime?';
        this.placeholder = 'Prezime';
        break;
      case 'email':
        this.text = 'Koji je tvoj email?';
        this.placeholder = 'Email';
        break;
      default:
        break;
    }
  }

  async dismissAndSendData() {
    await this.modalController.dismiss();
  }

  async dismiss() {
    await this.modalController.dismiss();
  }
}
