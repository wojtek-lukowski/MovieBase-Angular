import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { EmailValidator } from '@angular/forms';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  UserFromStorage: any = localStorage.getItem('user');
  currentUser: any = (JSON.parse(this.UserFromStorage));
  currentUsername: any = this.currentUser.Username;

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCurrentUser(this.currentUsername);
  }

  getCurrentUser(currentUser: string): void {
    this.fetchApiData.getUser(currentUser).subscribe((resp: any) => {
      this.currentUser = resp;
      return this.currentUser;
    });
  }

  backToMovies(): void {
    this.router.navigate(['movies']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  openUserEditDialog(
    username: string,
    password: string,
    email: string,
    birthday: string
  ): void {
    this.dialog.open(UserEditComponent, {
      data: {
        username,
        password,
        email,
        birthday
      },
      width: '500px'
    });
  }
}
