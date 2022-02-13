import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IRideRequestIn } from 'src/app/shared/models/ride-request/ride-request';
import { RideRequestService } from 'src/app/shared/services/ride-request.service';
import { IRide } from '../../shared/models/ride/ride';
import { RideService } from '../../shared/services/ride.service';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.page.html',
  styleUrls: ['./ride-info.page.scss'],
})
export class RideInfoPage implements OnInit {
  ride: IRide;
  user: any;
  waypoints: google.maps.DirectionsWaypoint[];
  contentLoaded: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rideService: RideService,
    private toastController: ToastController,
    private rideRequestService: RideRequestService
  ) {
    this.contentLoaded = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.route.params.subscribe((params) => {
      this.rideService.get(+params.rideId).subscribe((data) => {
        this.ride = data;
        this.waypoints = this.ride.stops.map((stop) => ({
          location: stop.place.name,
        }));
        this.contentLoaded = true;
      });
    });
  }

  async createRideRequest() {
    if (!this.user) {
      this.router.navigate(['/login']);
    } else if (this.user.id == this.ride.user.id) {
      const toast = await this.toastController.create({
        message: 'Ne možete rezervisati vlastitu vožnju.',
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    } else {
      const rideRequest: IRideRequestIn = {
        id: this.ride.id,
        number: 1,
        originId: this.ride.stops[0].id,
        destinationId: this.ride.stops[1].id,
      };
      this.rideRequestService.create(rideRequest).subscribe(async (value) => {
        if (value) {
          const toast = await this.toastController.create({
            message: 'Vožnja uspješno rezervisana.',
            duration: 3000,
            color: 'success',
          });
          toast.present();
          this.ride.available_free_seats--;
        } else {
          const toast = await this.toastController.create({
            message: 'Već ste rezervisali ovu vožnju.',
            duration: 3000,
            color: 'danger',
          });
          toast.present();
        }
      });
    }
  }
}
