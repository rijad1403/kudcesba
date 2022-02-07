import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IRideSearchFormData } from 'src/app/shared/models/ride/ride-search-form-data';
import { PlacesSearchModalComponent } from '../places-search-modal/places-search-modal.component';

@Component({
  selector: 'app-ride-search-form',
  templateUrl: './ride-search-form.component.html',
  styleUrls: ['./ride-search-form.component.scss'],
})
export class RideSearchFormComponent implements OnInit, OnChanges {
  @Input()
  rideSearchFormData: IRideSearchFormData;
  @Output()
  rideSearchFormSubmitted = new EventEmitter<IRideSearchFormData>();
  rideSearchForm: FormGroup;
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {
    this.rideSearchForm = new FormGroup({
      origin: new FormControl(),
      destination: new FormControl(),
      date: new FormControl(),
      // numOfPassengers: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.rideSearchForm.setValue({
      origin: changes.rideSearchFormData.currentValue.origin,
      destination: changes.rideSearchFormData.currentValue.destination,
      date: changes.rideSearchFormData.currentValue.date,
    });
  }

  async presentModal(placeType: string) {
    const modal = await this.modalController.create({
      component: PlacesSearchModalComponent,
      componentProps: {
        type: placeType,
      },
    });
    modal.addEventListener('ionModalDidPresent', () => {
      setTimeout(() => {
        document.querySelector<HTMLInputElement>('#placesSearch').focus();
      }, 1000);
    });
    await modal.present();
    const data = (await modal.onDidDismiss()).data;
    if (data.type === 'origin') {
      this.rideSearchForm.patchValue({
        origin: data.place.name,
      });
    } else if (data.type === 'dest') {
      this.rideSearchForm.patchValue({
        destination: data.place.name,
      });
    }
  }

  submitForm() {
    let formatedDate: string = null;
    if (this.rideSearchForm.value.date) {
      const date = new Date(this.rideSearchForm.value.date);
      formatedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
    }

    this.rideSearchFormSubmitted.emit({
      origin: this.rideSearchForm.value.origin,
      destination: this.rideSearchForm.value.destination,
      date: formatedDate,
    });
  }
}
