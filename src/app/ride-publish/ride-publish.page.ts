import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlacesSearchModalComponent } from '../partials/places-search-modal/places-search-modal.component';
import { ICar } from '../shared/models/car/car';
import { IPlace } from '../shared/models/ride/place';
import { IRideIn } from '../shared/models/ride/ride-in';
import { CarService } from '../shared/services/car.service';
import { RideService } from '../shared/services/ride.service';

@Component({
  selector: 'app-ride-publish',
  templateUrl: './ride-publish.page.html',
  styleUrls: ['./ride-publish.page.scss'],
})
export class RidePublishPage implements OnInit {
  newRideForm: FormGroup;
  vehicles: ICar[];
  origin: any;
  destination: any;

  constructor(
    private modalController: ModalController,
    private vehicleService: CarService,
    private rideService: RideService
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
    const ride: IRideIn = {
      route: {
        distance: 100,
        duration: 100,
        dates: ['2021-10-31'],
        stops: {
          origin: {
            sortKey: -1,
            name: this.origin.name,
            latitude: this.origin.latitude,
            longitude: this.origin.longitude,
            population: this.origin.population,
            hours: 0,
            minutes: 0,
            timeDelta: 0,
            distance: 0,
            duration: 0,
            nextDay: false,
          },
          waypoints: [],
          destination: {
            sortKey: -1,
            name: this.destination.name,
            latitude: this.destination.latitude,
            longitude: this.destination.longitude,
            population: this.destination.population,
            hours: 0,
            minutes: 0,
            timeDelta: 0,
            distance: 0,
            duration: 0,
            nextDay: false,
          },
        },
      },
      car: { id: this.newRideForm.value.vehicleId },
      details: {
        price: this.newRideForm.value.price,
        minPrice: this.newRideForm.value.price,
        freeSeats: this.newRideForm.value.freeSeats,
        maxSeats: this.newRideForm.value.freeSeats,
        luggage: this.newRideForm.value.luggage,
        smoking: this.newRideForm.value.smoking,
        female_only: this.newRideForm.value.femaleOnly,
        note: this.newRideForm.value.note,
      },
    };
    console.log(ride);
    this.rideService.createRide(ride).subscribe();
  }

  test() {
    const date = new Date(this.newRideForm.controls.dates.value);
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    console.log(formatedDate);
  }
}
