import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlacesSearchModalComponent } from '../partials/places-search-modal/places-search-modal.component';
import { RideService } from '../shared/services/ride.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  helpTexts = [];
  reasonsTexts = [];
  rideSearchForm: FormGroup;

  constructor(
    private rideService: RideService,
    private modalController: ModalController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.rideSearchForm = new FormGroup({
      start: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      // numOfPassengers: new FormControl('', [Validators.required]),
    });
    console.log(this.rideSearchForm);

    this.helpTexts = [
      {
        heading: 'Ideš nekamo?',
        body: 'Brzo ćeš pronaći ljude koji prolaze kraj tebe i putuju u tvom pravcu zato što imaš pristup milijunima putovanja.',
      },
      {
        heading: 'Poveži se s drugima',
        body: '  Upiši svoju točnu adresu kako bi pronašao savršen prijevoz. Odaberi s kim želiš putovati. I, rezerviraj!',
      },
      {
        heading: 'Pokret',
        body: 'Dođi točno tamo gdje želiš. Bez gnjavaže, bez redova i bez čekanja.',
      },
    ];

    this.reasonsTexts = [
      {
        heading: 'Ti biraš',
        body: 'Tisuće odredišta po odličnim cijenama.',
        icon: 'trail-sign-outline',
      },
      {
        heading: 'Sigurno dijeljenje prijevoza',
        body: 'Potvrda identiteta još je jedan postupak koji čini profile članova sigurnijima.',
        icon: 'document-lock-outline',
      },
      {
        heading: 'Ne gubi vrijeme',
        body: 'Ne trebaš ići na drugi kraj grada. Nađi prijevoz koji polazi u tvojoj blizini.',
        icon: 'location-outline',
      },
    ];
  }

  async presentModal(placeType: string) {
    const modal = await this.modalController.create({
      component: PlacesSearchModalComponent,
      componentProps: {
        type: placeType,
      },
    });
    modal.addEventListener('ionModalDidPresent', () => {
      console.log(modal);
      setTimeout(() => {
        document.querySelector<HTMLInputElement>('#placesSearch').focus();
      }, 1000);
    });
    await modal.present();
    const data = (await modal.onDidDismiss()).data;
    if (data.type === 'start' && data.place) {
      this.rideSearchForm.patchValue({
        start: data.place,
      });
    } else if (data.type === 'dest' && data.place) {
      this.rideSearchForm.patchValue({
        destination: data.place,
      });
    }
  }

  getTestRide() {
    this.rideService
      .getAllWithFilters(20, 1, 'id', 'Bihać', 'Sarajevo', '2021-06-16')
      .subscribe((data) => {
        console.log(data);
      });
  }

  getRide() {
    const date = new Date(this.rideSearchForm.value.date).getDate();
    const month = new Date(this.rideSearchForm.value.date).getMonth() + 1;
    const year = new Date(this.rideSearchForm.value.date).getFullYear();
    // console.log(this.destination, this.start, `${year}-${month}-${date}`);
    this.rideService
      .getAllWithFilters(
        20,
        1,
        'id',
        this.rideSearchForm.value.date.destination,
        this.rideSearchForm.value.start,
        this.rideSearchForm.value.date
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  test() {
    this.userService.getMyProfile().subscribe((data) => console.log(data));
  }
}
