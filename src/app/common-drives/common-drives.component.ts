import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-drives',
  templateUrl: './common-drives.component.html',
  styleUrls: ['./common-drives.component.scss'],
})
export class CommonDrivesComponent implements OnInit {
  allCommonDrives = [];
  commonDrives = [];
  showAllDrives = false;
  constructor() {}

  ngOnInit() {
    this.allCommonDrives.push(
      {
        start: 'Zagreb',
        destination: 'Split',
        distance: '80',
      },
      {
        start: 'Karlovac',
        destination: 'šibenik',
        distance: '100',
      },
      {
        start: 'Split',
        destination: 'Pula',
        distance: '78',
      },
      {
        start: 'Osijek',
        destination: 'Pag',
        distance: '88',
      },
      {
        start: 'Rijeka',
        destination: 'Zadar',
        distance: '98',
      }
    );
    this.showDrives();
  }

  showDrives() {
    if (this.showAllDrives) {
      this.commonDrives = this.allCommonDrives;
    } else {
      this.commonDrives = this.allCommonDrives.slice(0, 3);
    }
    this.showAllDrives = !this.showAllDrives;
  }
}
