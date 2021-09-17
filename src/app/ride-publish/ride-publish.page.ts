import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlacesSearchModalComponent } from '../partials/places-search-modal/places-search-modal.component';
import { ICar } from '../shared/models/car/car';
import { IPlace } from '../shared/models/place/place';
import { IRide } from '../shared/models/ride/ride';
import { IRideIn } from '../shared/models/ride/ride-in';
import { CarService } from '../shared/services/car.service';

@Component({
  selector: 'app-ride-publish',
  templateUrl: './ride-publish.page.html',
  styleUrls: ['./ride-publish.page.scss'],
})
export class RidePublishPage implements OnInit {
  newRideForm: FormGroup;
  vehicles: ICar[];
  origin: IPlace;
  destination: IPlace;

  constructor(
    private modalController: ModalController,
    private vehicleService: CarService
  ) {}

  ngOnInit() {
    this.newRideForm = new FormGroup({
      origin: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      vehicleId: new FormControl(null, Validators.required),
      distance: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
      dates: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      freeSeats: new FormControl(null, Validators.required),
      luggage: new FormControl(true, Validators.required),
      smoking: new FormControl(false, Validators.required),
      femaleOnly: new FormControl(false, Validators.required),
      note: new FormControl('', Validators.required),
    });
    this.vehicleService.getAll().subscribe((data) => {
      this.vehicles = data;
    });
  }

  async presentModal(placeType: string) {
    const modal = await this.modalController.create({
      component: PlacesSearchModalComponent,
      componentProps: {
        type: placeType,
      },
    });
    await modal.present();
    const data = (await modal.onDidDismiss()).data;
    if (data.type === 'start' && data.place) {
      this.origin = data.place;
      this.newRideForm.patchValue({
        origin: data.place.name,
      });
    } else if (data.type === 'dest' && data.place) {
      this.destination = data.place;
      this.newRideForm.patchValue({
        destination: data.place.name,
      });
    }
  }

  createRide() {
    console.log(this.newRideForm);
    const ride: IRideIn = {
      stops: {
        origin: this.origin,
        destination: this.destination,
      },
      car: this.newRideForm.value.vehicleId,
      dates: ['2021-31-10'],
      distance: 100,
      duration: 100,
      details: {
        price: this.newRideForm.value.price,
        minPrice: this.newRideForm.value.price,
        freeSeats: this.newRideForm.value.seats,
        maxSeats: this.newRideForm.value.seats,
        luggage: this.newRideForm.value.luggage,
        smoking: this.newRideForm.value.smoking,
        female_only: this.newRideForm.value.femaleOnly,
        note: this.newRideForm.value.note,
      },
    };
  }

  test() {
    const date = new Date(this.newRideForm.controls.dates.value);
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    console.log(formatedDate);
  }
}
