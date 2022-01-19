import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-card',
  templateUrl: './description-card.component.html',
  styleUrls: ['./description-card.component.scss']
})
export class DescriptionCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description: string;
    }
    // public fetchApiData: UserRegistrationService,
    // public dialogRef: MatDialogRef<DescriptionCardComponent>,
  ) { }

  ngOnInit(): void {
    // this.getDescription();
  }

  // getDescription(): void {
  //   console.log('getting description');
  //   this.fetchApiData.getMovie().subscribe((resp: any) => {
  //     this.movies = resp;
  //     console.log(this.movies);
  //     return this.movies;
  //   });
  // }

}
