import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userData: any = {
    Username: this.data.username,
    Password: '',
    Email: this.data.email,
    Birthday: this.data.birthday
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
      password: string;
      email: string;
      birthday: Date;
    }
  ) { }

  ngOnInit(): void {
  }

  editUser(): void {
    console.log('edit changes called');
    console.log('userData:', this.userData);
    console.log('username', this.data.username);
    console.log('birthday', this.data.birthday);
    this.fetchApiData.editUser(this.data.username, this.userData).subscribe((resp: any) => {
      this.dialogRef.close();
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackbar.open('Data successfully updated', 'OK', { duration: 4000 })
    });
  }

}
