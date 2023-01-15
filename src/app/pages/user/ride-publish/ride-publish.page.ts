/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlacesSearchModalComponent } from '../../../partials/places-search-modal/places-search-modal.component';
import { ICar } from '../../../shared/models/car/car';
import { IRideIn } from '../../../shared/models/ride/ride-in';
import { CarService } from '../../../shared/services/car.service';
import { RideService } from '../../../shared/services/ride.service';
import { addSeconds, nextDay } from 'date-fns';
import { Router, NavigationEnd } from '@angular/router';
import { ICarType } from 'src/app/shared/models/car/car-type';
import { CommonService } from 'src/app/shared/services/common.service';
import { IPlace, PlaceType } from 'src/app/shared/models/ride/place';

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
  waypoints: google.maps.DirectionsWaypoint[];
  rideWaypoints: IPlace[];
  rideOrigin: IPlace;
  rideDestination: IPlace;
  lat = 43.915886;
  lng = 17.679076;
  directionsResult: google.maps.DirectionsResult;
  showDirections = false;
  totalTravelHours: number;
  totalTravelMinutes: number;
  totalTravelDistance: number;
  pageLoaded = false;
  contentLoaded = false;
  vehicleTypes: ICarType[];
  selectedVehicle: ICar;
  selectedVehicleType: ICarType;
  oneTimeRide = true;
  days = [
    'Ponedjeljak',
    'Utorak',
    'Srijeda',
    'Četvrtak',
    'Petak',
    'Subota',
    'Nedjelja',
  ];
  selectedDays: string[];
  waypointsReset: boolean;
  legs: google.maps.DirectionsLeg[];
  get placeType() {
    return PlaceType;
  }

  constructor(
    private modalController: ModalController,
    private vehicleService: CarService,
    private rideService: RideService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.newRideForm.reset();
        this.vehicleService.getAll().subscribe((data) => {
          this.vehicles = data;
          this.contentLoaded = true;
        });
      }
    });
    this.vehicleService.getCarTypes().subscribe((data) => {
      this.vehicleTypes = data;
      this.pageLoaded = true;
    });
    this.newRideForm = new FormGroup({
      origin: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
      arrivalTime: new FormControl('', Validators.required),
      nextDay: new FormControl(false, Validators.required),
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
    this.waypointsReset = true;
    this.directionsResult = event;
    this.legs = this.directionsResult.routes[0].legs;
    this.rideWaypoints.forEach((waypoint, index) => {
      waypoint.latitude = this.legs[index].end_location.lat();
      waypoint.longitude = this.legs[index].end_location.lng();
      waypoint.distance = this.legs[index].distance.value;
      waypoint.duration = this.legs[index].duration.value;
      waypoint.timeDelta = 0;
      waypoint.sortKey = index;
    });
    this.rideOrigin.latitude = this.legs[0].start_location.lat();
    this.rideOrigin.longitude = this.legs[0].start_location.lng();
    this.rideDestination.latitude =
      this.legs[this.legs.length - 1].end_location.lat();
    this.rideDestination.longitude =
      this.legs[this.legs.length - 1].end_location.lng();
    this.rideDestination.distance =
      this.legs[this.legs.length - 1].distance.value;
    this.calculateTimeOnResponse(this.legs);
    this.calculateTotalTravelDistance();
    this.waypointsReset = false;
  }

  calculateTimeOnResponse(legs: google.maps.DirectionsLeg[]) {
    const departureDate =
      this.newRideForm.value.date == '' || this.newRideForm.value.date == null
        ? new Date()
        : new Date(this.newRideForm.value.date);
    if (this.newRideForm.value.departureTime != '') {
      departureDate.setHours(
        new Date(this.newRideForm.value.departureTime).getHours(),
        new Date(this.newRideForm.value.departureTime).getMinutes()
      );
    }
    let currentDate = departureDate;
    this.rideWaypoints.forEach((waypoint) => {
      const lastDate = currentDate;
      currentDate = addSeconds(currentDate, waypoint.duration);
      waypoint.hours = currentDate.getHours();
      waypoint.minutes = currentDate.getMinutes();
      waypoint.dateString = currentDate.toString();
      waypoint.nextDay =
        currentDate.getDate() > lastDate.getDate() ||
        currentDate.getMonth() > lastDate.getMonth() ||
        currentDate.getFullYear() > lastDate.getFullYear();
    });
    const lastDirectionLeg = legs[legs.length - 1];
    const arrivalDate = addSeconds(
      currentDate,
      lastDirectionLeg.duration.value
    );
    this.newRideForm.patchValue({
      date: departureDate.toString(),
      departureTime: departureDate.toString(),
      arrivalTime: arrivalDate.toString(),
      nextDay:
        arrivalDate.getDate() > currentDate.getDate() ||
        arrivalDate.getMonth() > currentDate.getMonth() ||
        arrivalDate.getFullYear() > currentDate.getFullYear(),
    });
    const totalTravelSeconds =
      legs.length == 1
        ? legs[0].duration.value
        : this.rideWaypoints
            .map((waypoint) => waypoint.duration)
            .reduce((total, duration) => total + duration) +
          lastDirectionLeg.duration.value;
    this.totalTravelHours = Math.floor(totalTravelSeconds / 3600);
    this.totalTravelMinutes = Math.floor((totalTravelSeconds % 3600) / 60);
  }

  calculateTotalTimeDuration() {
    this.rideOrigin.hours = new Date(
      this.newRideForm.value.departureTime as string
    ).getHours();
    this.rideOrigin.minutes = new Date(
      this.newRideForm.value.departureTime as string
    ).getMinutes();
    this.rideWaypoints.forEach((waypoint, index) => {
      const previousLocationTime =
        index === 0
          ? this.rideOrigin.hours * 60 + this.rideOrigin.minutes
          : waypoint.hours * 60 + waypoint.minutes;
      const currentLocationTime = waypoint.hours * 60 + waypoint.minutes;
      waypoint.duration =
        (currentLocationTime +
          (waypoint.nextDay ? 24 * 60 : 0) -
          previousLocationTime) *
        60;
    });
    const lastWaypoint = this.rideWaypoints[this.rideWaypoints.length - 1];
    this.rideDestination.hours = new Date(
      this.newRideForm.value.arrivalTime as string
    ).getHours();
    this.rideDestination.minutes = new Date(
      this.newRideForm.value.arrivalTime as string
    ).getMinutes();
    this.rideDestination.nextDay = this.newRideForm.value.nextDay as boolean;
    const lastWaypointTime = lastWaypoint.hours * 60 + lastWaypoint.minutes;
    const destinationTime =
      this.rideDestination.hours * 60 + this.rideDestination.minutes;
    this.rideDestination.duration =
      (destinationTime +
        (this.rideDestination.nextDay ? 24 * 60 : 0) -
        lastWaypointTime) *
      60;
    const rideWaypointSeconds = this.rideWaypoints
      .map((rideWaypoint) => rideWaypoint.duration)
      .reduce((total, num) => total + num, 0);
    const totalTravelSeconds =
      this.rideOrigin.duration +
      rideWaypointSeconds +
      this.rideDestination.duration;
    this.totalTravelHours = Math.floor(totalTravelSeconds / 3600);
    this.totalTravelMinutes = Math.floor((totalTravelSeconds % 3600) / 60);
    console.log(this.rideOrigin, this.rideDestination, this.rideWaypoints);
  }

  calculateTotalTravelDistance() {
    const rideWaypointDistance = this.rideWaypoints
      .map((rideWaypoint) => rideWaypoint.distance)
      .reduce((total, num) => total + num, 0);
    this.totalTravelDistance = Math.round(
      (rideWaypointDistance + this.rideDestination.distance) / 1000
    );
  }

  async presentModal(placeType: PlaceType) {
    const modal = await this.modalController.create({
      component: PlacesSearchModalComponent,
      componentProps: {
        placeType,
      },
    });
    await modal.present();
    const data = (await modal.onDidDismiss()).data;
    if (placeType === 'waypoint' && data.place.id) {
      if (data.place) {
        this.waypoints.push({
          location: new google.maps.LatLng(
            data.place.latitude,
            data.place.longitude
          ),
        });
        this.waypoints = [...this.waypoints];
        this.rideWaypoints.push({
          id: data.place.id,
          name: data.place.name,
          latitude: +data.place.latitude,
          longitude: +data.place.longitude,
          sortKey: this.rideWaypoints.length,
          population: +data.place.population,
        } as IPlace);
      }
    } else {
      if (placeType === 'origin') {
        this.origin = {
          lat: data.place.latitude ? +data.place.latitude : 0,
          lng: data.place.longitude ? +data.place.longitude : 0,
        };
        this.newRideForm.patchValue({
          origin: data.place.name ?? '',
        });
        this.rideOrigin = {
          id: data.place.id,
          name: data.place.name,
          sortKey: -1,
          timeDelta: 0,
          population: 0,
          nextDay: false,
          distance: 0,
          duration: 0,
        } as IPlace;
      } else if (placeType === 'destination') {
        this.destination = {
          lat: data.place.latitude ? +data.place.latitude : 0,
          lng: data.place.longitude ? +data.place.longitude : 0,
        };
        this.newRideForm.patchValue({
          destination: data.place.name ?? '',
        });
        this.rideDestination = {
          id: data.place.id,
          name: data.place.name,
          sortKey: -1,
          timeDelta: 0,
          population: 0,
          nextDay: false,
          distance: 0,
          duration: 0,
        } as IPlace;
      }
      this.getRouteFromScratch();
    }
  }

  getRouteFromScratch() {
    this.showDirections = false;
    if (this.origin?.lat > 0 && this.destination?.lat > 0) {
      const directionService = new google.maps.DirectionsService();
      const request = {
        origin: this.origin,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      directionService.route(request, (result, status) => {
        if (status === 'OK') {
          const originLat = result.routes[0].legs[0].start_location.lat();
          const originLng = result.routes[0].legs[0].start_location.lng();
          const destinationLat = result.routes[0].legs[0].end_location.lat();
          const destinationLng = result.routes[0].legs[0].end_location.lng();
          const formData = new FormData();
          formData.append('origin[lg]', `${originLng}`);
          formData.append('origin[lt]', `${originLat}`);
          formData.append('destination[lg]', `${destinationLng}`);
          formData.append('destination[lt]', `${destinationLat}`);
          formData.append(
            'distance',
            result.routes[0].legs[0].distance.value.toString()
          );
          result.routes[0].overview_path.forEach((path, index) => {
            formData.append(`path[${index}][lg]`, `${path.lng()}`);
            formData.append(`path[${index}][lt]`, `${path.lat()}`);
          });
          this.commonService
            .getRideWaypoints(formData)
            .subscribe((waypoints) => {
              this.waypoints = [];
              this.rideWaypoints = [];
              (waypoints as any[]).forEach((waypoint, index) => {
                this.waypoints.push({
                  location: new google.maps.LatLng(
                    waypoint.latitude,
                    waypoint.longitude
                  ),
                });
                this.rideWaypoints.push({
                  id: waypoint.id,
                  name: waypoint.name,
                  latitude: +waypoint.latitude,
                  longitude: +waypoint.longitude,
                  sortKey: index,
                  population: +waypoint.population,
                } as IPlace);
              });
              this.showDirections = true;
            });
        }
      });
    } else {
      this.totalTravelDistance = 0;
    }
  }

  submitForm() {
    const vehicle: ICar = this.newRideForm.value.vehicle;
    const stopsLength = this.directionsResult.routes[0].legs.length;
    const ride: IRideIn = {
      route: {
        distance: this.directionsResult.routes[0].legs[0].distance.value,
        duration: this.directionsResult.routes[0].legs[0].duration.value,
        dates: [this.getFormatedDateTime(this.newRideForm.value.date, 'date')],
        stops: {
          origin: {
            sortKey: -1,
            name: this.newRideForm.value.origin,
            latitude:
              this.directionsResult.routes[0].legs[0].start_location.lat(),
            longitude:
              this.directionsResult.routes[0].legs[0].start_location.lng(),
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
            latitude:
              this.directionsResult.routes[0].legs[
                stopsLength - 1
              ].end_location.lat(),
            longitude:
              this.directionsResult.routes[0].legs[
                stopsLength - 1
              ].end_location.lng(),
            hours: new Date(this.newRideForm.value.arrivalTime).getHours(),
            minutes: new Date(this.newRideForm.value.arrivalTime).getMinutes(),
            population: 0,
            timeDelta: 0,
            distance: 0,
            duration: 0,
            nextDay: false,
          },
          waypoints: this.rideWaypoints,
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
    this.selectedVehicle = event.detail.value;
    this.selectedVehicleType = this.vehicleTypes.find(
      (type) => type.id === this.selectedVehicle.car_type_id
    );
  }

  loadVehicles() {
    this.vehicleService.getAll().subscribe((data) => {
      this.vehicles = data;
    });
  }

  openNewVehicleContainer() {
    this.selectedVehicle = {
      id: -1,
      color: '',
      manufacturer: '',
      model: '',
    } as ICar;
  }

  removeWaypoint(waypoint: IPlace) {
    this.rideWaypoints = this.rideWaypoints.filter(
      (wP) => wP.id !== waypoint.id
    );
    this.waypoints = this.waypoints.filter(
      (wP, index) => index !== waypoint.sortKey
    );
  }

  changeRideType(event) {
    this.oneTimeRide = !(event.detail.checked as boolean);
  }

  onDaySelect(event) {
    this.selectedDays = event.detail.value;
  }

  setNextDayCheckboxes(event: any, locationNumber?: number) {
    const departureTime = new Date(
      this.newRideForm.value.departureTime as string
    );
    if (this.rideWaypoints && departureTime && !this.waypointsReset) {
      const arrivalTime = new Date(
        this.newRideForm.value.arrivalTime as string
      );
      const date = new Date(event.detail.value as string);
      if (locationNumber === -1) {
        departureTime.setHours(date.getHours(), date.getMinutes());
      } else if (locationNumber === -2) {
        arrivalTime.setHours(date.getHours(), date.getMinutes());
      } else {
        this.rideWaypoints[locationNumber].hours = date.getHours();
        this.rideWaypoints[locationNumber].minutes = date.getMinutes();
      }
      this.rideWaypoints.forEach((waypoint, index, waypoints) => {
        const previousWaypointHours =
          index === 0 ? departureTime.getHours() : waypoints[index - 1].hours;
        const previousWaypointMinutes =
          index === 0
            ? departureTime.getMinutes()
            : waypoints[index - 1].minutes;
        if (!waypoint.nextDay) {
          waypoint.nextDay =
            previousWaypointHours * 60 + previousWaypointMinutes >=
            waypoint.hours * 60 + waypoint.minutes;
        }
      });
      const lastWaypoint = this.rideWaypoints[this.rideWaypoints.length - 1];
      if (!(this.newRideForm.value.nextDay as boolean)) {
        this.newRideForm.patchValue({
          nextDay:
            lastWaypoint.hours * 60 + lastWaypoint.minutes >=
            arrivalTime.getHours() * 60 + arrivalTime.getMinutes(),
        });
      }
      this.calculateTotalTimeDuration();
    }
  }

  onNextDayChange(event, locationNumber: number) {
    const nextDayChecked = event.detail.checked as boolean;
    if (this.rideWaypoints && !this.waypointsReset) {
      if (nextDayChecked) {
        if (locationNumber === -2) {
          this.newRideForm.patchValue({
            nextDay: true,
          });
        } else {
          this.rideWaypoints[locationNumber].nextDay = nextDayChecked;
        }
      } else {
        if (locationNumber === -2) {
          const previousLocationTime =
            this.rideWaypoints[this.rideWaypoints.length - 1].hours * 60 +
            this.rideWaypoints[this.rideWaypoints.length - 1].minutes;
          const arrivalTime = new Date(
            this.newRideForm.value.arrivalTime as string
          );
          this.newRideForm.patchValue({
            nextDay:
              previousLocationTime >
              arrivalTime.getHours() * 60 + arrivalTime.getMinutes(),
          });
        } else {
          const departureTime = new Date(
            this.newRideForm.value.departureTime as string
          );
          const previousLocationTime =
            locationNumber === 0
              ? departureTime.getHours() * 60 + departureTime.getMinutes()
              : this.rideWaypoints[locationNumber - 1].hours * 60 +
                this.rideWaypoints[locationNumber - 1].minutes;
          const currentLocationTime =
            this.rideWaypoints[locationNumber].hours * 60 +
            this.rideWaypoints[locationNumber].minutes;
          this.rideWaypoints[locationNumber].nextDay =
            previousLocationTime > currentLocationTime;
        }
      }
      this.calculateTotalTimeDuration();
    }
  }
}
