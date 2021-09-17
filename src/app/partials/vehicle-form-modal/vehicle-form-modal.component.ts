import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ICar } from 'src/app/shared/models/car/car';
import { ICarType } from 'src/app/shared/models/car/car-type';
import { CarService } from 'src/app/shared/services/car.service';

@Component({
  selector: 'app-vehicle-form-modal',
  templateUrl: './vehicle-form-modal.component.html',
  styleUrls: ['./vehicle-form-modal.component.scss'],
})
export class VehicleFormModalComponent implements OnInit {
  @Input() vehicle: ICar;
  @Input() vehicleTypes: ICarType[];
  newVehicleForm: FormGroup;
  constructor(
    private carService: CarService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.vehicle);
    this.newVehicleForm = new FormGroup({
      manufacturer: new FormControl(
        this.vehicle ? this.vehicle.manufacturer : '',
        Validators.required
      ),
      model: new FormControl(
        this.vehicle ? this.vehicle.model : '',
        Validators.required
      ),
      color: new FormControl(
        this.vehicle ? this.vehicle.color : '',
        Validators.required
      ),
      seats: new FormControl(
        this.vehicle ? this.vehicle.seats : '',
        Validators.required
      ),
      vehicleType: new FormControl(
        this.vehicle ? this.vehicle.car_type_id : '',
        Validators.required
      ),
    });
  }

  submitForm() {
    const vehicle: ICar = {
      manufacturer: this.newVehicleForm.value.manufacturer,
      model: this.newVehicleForm.value.model,
      color: this.newVehicleForm.value.color,
      seats: this.newVehicleForm.value.seats,
      car_type_id: this.newVehicleForm.value.vehicleType,
      status_id: 1,
      user_id: JSON.parse(localStorage.getItem('currentUser')).id,
    };
    if (this.vehicle?.id) {
      this.carService.update(this.vehicle.id, vehicle).subscribe(
        (data) => {
          this.dismiss(true);
        },
        async (error) => {
          this.dismiss(false);
          this.router.navigate(['']);
        }
      );
    } else {
      this.carService.add(vehicle).subscribe(
        (data) => {
          this.dismiss(true);
        },
        (error) => {
          this.dismiss(false);
          this.router.navigate(['']);
        }
      );
    }
  }

  async dismiss(updateVehicleList: boolean) {
    await this.modalController.dismiss({
      updateVehicleList,
    });
  }
}
