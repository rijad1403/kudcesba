import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { VehicleFormModalComponent } from '../../../partials/vehicle-form-modal/vehicle-form-modal.component';
import { ICar } from '../../../shared/models/car/car';
import { ICarType } from '../../../shared/models/car/car-type';
import { CarService } from '../../../shared/services/car.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
  newVehicleForm: FormGroup;
  vehicles: ICar[];
  vehicleTypes: ICarType[];
  contentLoaded: boolean;
  constructor(
    private carService: CarService,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.carService.getCarTypes().subscribe(
      (carTypes) => {
        this.contentLoaded = false;
        this.vehicleTypes = carTypes;
      },
      () => {},
      () => {
        this.carService.getStatuses().subscribe(
          () => {},
          () => {},
          () => {
            this.carService.getAll().subscribe((data) => {
              this.vehicles = data;
              this.contentLoaded = true;
            });
          }
        );
      }
    );
  }

  async openVehicleModal(vehicle?: ICar) {
    const modal = await this.modalController.create({
      component: VehicleFormModalComponent,
      componentProps: {
        vehicle,
        vehicleTypes: this.vehicleTypes,
      },
    });
    await modal.present();
    const data = (await modal.onWillDismiss()).data;
    if (data.updateVehicleList) {
      this.loadVehicles();
    }
  }

  async openDeleteVehicleAlert(vehicle: ICar) {
    const alert = await this.alertController.create({
      header: 'Brisanje vozila',
      message: `Da li stvarno želite obrisati vozilo "${vehicle.manufacturer}, ${vehicle.model}"?`,
      buttons: [
        {
          text: 'Da',
          role: 'confirm',
          handler: () => {
            this.carService.delete(vehicle.id).subscribe(
              (data) => {
                console.log(data);
                this.loadVehicles();
              },
              (error) => {
                this.router.navigate(['']);
              }
            );
          },
        },
        {
          text: 'Poništi',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }
}
