import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RideService } from '../shared/services/ride.service';

@Component({
  selector: 'app-ride-share',
  templateUrl: './ride-share.page.html',
  styleUrls: ['./ride-share.page.scss'],
})
export class RideSharePage implements OnInit {
  start: string;
  destination: string;
  rides = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rideService: RideService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data) => {
      this.start = data.start;
      this.destination = data.destination;
    });
    this.rides = this.rideService.getAll();
  }
}
