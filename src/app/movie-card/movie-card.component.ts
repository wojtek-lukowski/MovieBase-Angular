import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  username: any = localStorage.getItem('user');
  user: any = JSON.parse(this.username);
  currentUser: any = null;
  currentFavs: any = null;
  isInFavs: boolean = false;

  constructor(
    public dialog: MatDialog,
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // console.log('calling onInit');
    this.getMovies();
    // console.log('onInit calling getMovies');
    this.getCurrentUser(this.user.Username);
    // console.log('onInit calling getCurentUser');
    // console.log('curent favs from onInit: ', this.currentFavs);
    // this.favCheck(movieId);
  }

  getCurrentUser(username: string): void {
    // console.log('calling getCurrentUser');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.currentUser = resp;
      // console.log('current user: ', this.currentUser);
      // console.log('response: ', resp);
      this.currentFavs = resp.Favorites;
      // console.log('response favs: ', resp.Favorites);
      // console.log('current favs from getCurrentUser: ', this.currentFavs);
      return (this.currentUser, this.currentFavs);
    });
  }

  // favCheck(movieId: string): void {
  //   if (this.currentFavs.filter(function (e: any) { return e._id === movieId; }).length > 0) {
  //     this.isInFavs = true;
  //     return
  //   }
  // }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
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


  toggleFavs(movieId: string): void {
    if (this.currentFavs.filter(function (e: any) { return e._id === movieId; }).length > 0) {
      this.removeFromFavs(movieId);
      console.log(movieId, 'removed form favs');
      this.isInFavs = false;
    } else {
      this.addToFavs(movieId)
      console.log(movieId, 'added to favs');
      this.isInFavs = true;
    }
  }

  addToFavs(movieId: string): void {
    //checking if the title is already in favs
    if (this.currentFavs.filter(function (e: any) { return e._id === movieId; }).length > 0) {
      this.snackBar.open('Already in your favs', 'OK', { duration: 2000 });
      return
    } else {
      this.fetchApiData.addToFavs(this.user.Username, movieId).subscribe((resp: any) => {
        // console.log('adding ', movieId);
        // window.location.reload;
        this.getCurrentUser(this.user.Username);
        this.ngOnInit();
        this.snackBar.open('Added to favs', 'OK', { duration: 2000 });
      });
    }
  }

  removeFromFavs(movieId: string): void {
    this.fetchApiData.removeFromFavs(this.user.Username, movieId).subscribe((resp: any) => {
      this.snackBar.open('Removed from favs', 'OK', { duration: 2000 });
      this.getCurrentUser(this.user.Username);
      this.ngOnInit();
      2000
    });
  }

  // toggleHeart(movieId: string): string {
  //   let favIds = this.currentFavs.map(function (fav: any) { return fav._id });
  //   return favIds.includes(movieId) ? 'warn' : 'primary';
  // }

  favCheck(movieId: string): any {
    let favIds = this.currentFavs.map(function (fav: any) { return fav._id });
    if (favIds.includes(movieId)) {
      this.isInFavs = true;
      return this.isInFavs;
    };
  }
}
