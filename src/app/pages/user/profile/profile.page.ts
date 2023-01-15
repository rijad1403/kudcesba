import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('file')
  fileInput: ElementRef;
  filesLength: number;
  user: any;
  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  updateProfileImage() {
    const file = (this.fileInput.nativeElement as HTMLInputElement).files[0];
    if (file) {
      const isImage = file.type.includes('image');
      if (isImage) {
        const formData = new FormData();
        formData.append('image', file);
        this.userService.updateProfileImage(formData).subscribe((data) => {
          if (data === true) {
            this.userService.getMyProfile().subscribe((userData) => {
              this.user = userData;
              localStorage.setItem('currentUser', JSON.stringify(this.user));
              (this.fileInput.nativeElement as HTMLInputElement).value = null;
              this.filesLength = 0;
              this.messageService.displayToast(
                'Profilna slika ažurirana.',
                'success'
              );
            });
          }
        });
      } else {
        this.messageService.displayToast(
          'Datoteka nije formata slike.',
          'danger'
        );
      }
    }
  }
}
