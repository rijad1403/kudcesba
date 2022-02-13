import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private toastController: ToastController) {}

  async displayToast(message: string, color: string, duration: number = 3000) {
    const toast = await this.toastController.create({
      message,
      color,
      duration,
    });
    await toast.present();
  }
}
