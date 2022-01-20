import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  username: any = localStorage.getItem('user');
  user: any = JSON.parse(this.username);

  constructor(
    public dialog: MatDialog,
    public fetchApiData: UserRegistrationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDescriptionDialog(
    title: string,
    description: string,
  ): void {
    this.dialog.open(DescriptionCardComponent, {
      data: {
        title,
        description
      },
      width: '500px'
    });
  }

  openDirectorDialog(
    name: string,
    bio: string,
    birth: Date,
    death: Date
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        name,
        bio,
        birth,
        death
      },
      width: '500px'
    });
  }

  openGenreDialog(
    name: string,
    description: string
  ): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        name,
        description,
      },
      width: '500px'
    });
  }

  openProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
