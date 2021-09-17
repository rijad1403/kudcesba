import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RideService } from '../shared/services/ride.service';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.page.html',
  styleUrls: ['./ride-info.page.scss'],
})
export class RideInfoPage implements OnInit {
  ride: any;
  contentLoaded = false;
  constructor(
    private route: ActivatedRoute,
    private rideService: RideService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.ride = this.rideService.get(+params.rideId).subscribe((data) => {
        this.ride = data;
        this.contentLoaded = true;
      });
    });
  }
}
