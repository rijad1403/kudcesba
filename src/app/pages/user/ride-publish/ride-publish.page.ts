/* eslint-disable eqeqeq */
import {} from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlacesSearchModalComponent } from '../../../partials/places-search-modal/places-search-modal.component';
import { ICar } from '../../../shared/models/car/car';
import { IRideIn } from '../../../shared/models/ride/ride-in';
import { CarService } from '../../../shared/services/car.service';
import { RideService } from '../../../shared/services/ride.service';
import { addSeconds } from 'date-fns';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-ride-publish',
  templateUrl: './ride-publish.page.html',
  styleUrls: ['./ride-publish.page.scss'],
})
export class RidePublishPage implements OnInit {
  newRideForm: FormGroup;
  vehicles: ICar[];
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  lat = 43.915886;
  lng = 17.679076;
  directionsResult: google.maps.DirectionsResult;
  showDirections = false;
  totalTravelDuration = '0h';
  totalTravelDistance = '0 km';
  pageLoaded = false;
  contentLoaded = false;
  constructor(
    private modalController: ModalController,
    private vehicleService: CarService,
    private rideService: RideService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        this.newRideForm.reset();
        this.vehicleService.getAll().subscribe((data) => {
          this.vehicles = data;
          this.contentLoaded = true;
        });
      }
    });
    this.pageLoaded = true;
    this.newRideForm = new FormGroup({
      origin: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
      arrivalTime: new FormControl('', Validators.required),
      vehicle: new FormControl('', Validators.required),
      // freeSeats: new FormControl(null, Validators.required),
      luggage: new FormControl(true, Validators.required),
      smoking: new FormControl(false, Validators.required),
      femaleOnly: new FormControl(false, Validators.required),
      price: new FormControl(null, Validators.required),
      note: new FormControl(''),
    });
  }

  onResponse(event: google.maps.DirectionsResult) {
    this.directionsResult = event;
    const date =
      this.newRideForm.value.date == ''
        ? new Date()
        : new Date(this.newRideForm.value.date);
    const departureTime = date;
    if (this.newRideForm.value.departureTime != '') {
      departureTime.setHours(
        new Date(this.newRideForm.value.departureTime).getHours(),
        new Date(this.newRideForm.value.departureTime).getMinutes()
      );
    }
    const arrivalTime = addSeconds(
      new Date(departureTime),
      this.directionsResult.routes[0].legs[0].duration.value
    );
    this.newRideForm.patchValue({
      date: date.toString(),
      departureTime: departureTime.toString(),
      arrivalTime: arrivalTime.toString(),
    });
    this.totalTravelDuration =
      this.directionsResult.routes[0].legs[0].duration.text;
    this.totalTravelDistance =
      this.directionsResult.routes[0].legs[0].distance.text;
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
    if (data.type === 'start') {
      this.origin = {
        lat: data.place.latitude ? +data.place.latitude : 0,
        lng: data.place.longitude ? +data.place.longitude : 0,
      };
      this.newRideForm.patchValue({
        origin: data.place.name ?? '',
      });
    } else if (data.type === 'dest') {
      this.destination = {
        lat: data.place.latitude ? +data.place.latitude : 0,
        lng: data.place.longitude ? +data.place.longitude : 0,
      };
      this.newRideForm.patchValue({
        destination: data.place.name ?? '',
      });
    }
    if (this.origin?.lat > 0 && this.destination?.lat > 0) {
      this.showDirections = true;
    } else {
      this.showDirections = false;
      this.totalTravelDuration = '0h';
      this.totalTravelDistance = '0 km';
    }
  }

  submitForm() {
    const vehicle: ICar = this.newRideForm.value.vehicle;
    const ride: IRideIn = {
      route: {
        distance: this.directionsResult.routes[0].legs[0].distance.value,
        duration: this.directionsResult.routes[0].legs[0].duration.value,
        dates: [this.getFormatedDateTime(this.newRideForm.value.date, 'date')],
        stops: {
          origin: {
            sortKey: -1,
            name: this.newRideForm.value.origin,
            latitude: this.directionsResult.routes[0].legs[0].start_location
              .lat()
              .toString(),
            longitude: this.directionsResult.routes[0].legs[0].start_location
              .lng()
              .toString(),
            population: 0,
            hours: new Date(this.newRideForm.value.departureTime).getHours(),
            minutes: new Date(
              this.newRideForm.value.departureTime
            ).getMinutes(),
            timeDelta: 0,
            distance: 0,
            duration: 0,
            nextDay: false,
          },
          destination: {
            sortKey: -1,
            name: this.newRideForm.value.destination,
            latitude: this.directionsResult.routes[0].legs[0].end_location
              .lat()
              .toString(),
            longitude: this.directionsResult.routes[0].legs[0].end_location
              .lat()
              .toString(),
            hours: new Date(this.newRideForm.value.arrivalTime).getHours(),
            minutes: new Date(this.newRideForm.value.arrivalTime).getMinutes(),
            population: 0,
            timeDelta: 0,
            distance: 0,
            duration: 0,
            nextDay: false,
          },
          waypoints: [],
        },
      },
      car: { id: this.newRideForm.value.vehicle.id.toString() },
      details: {
        price: this.newRideForm.value.price,
        minPrice: this.newRideForm.value.price,
        freeSeats: (vehicle.seats - 1).toString(),
        maxSeats: vehicle.seats.toString(),
        luggage: this.newRideForm.value.luggage,
        smoking: this.newRideForm.value.smoking,
        female_only: this.newRideForm.value.femaleOnly,
        note: this.newRideForm.value.note,
      },
    };
    this.rideService.createRide(ride).subscribe((value) => {
      console.log(value);
    });
  }

  getFormatedDateTime(date: Date, valueToReturn: string) {
    if (valueToReturn == 'date') {
      return `${new Date(date).getFullYear()}-${
        new Date(date).getMonth() + 1
      }-${new Date(date).getDate()}`;
    } else if (valueToReturn == 'time') {
      return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
    }
  }

  onCarSelect(event) {
    if (event.detail.value == 'newVehicle') {
      this.router.navigate(['/user/vehicles']);
    }
  }
}
