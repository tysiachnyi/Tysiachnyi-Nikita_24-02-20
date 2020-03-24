import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movies} from '../shared/models/movies';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesGalleryService {
  movies: Movies[] = [];
  likedMovies: Movies[] = [];
  likedMovie;
  // localStorageData: any[] = JSON.parse(localStorage.getItem('likedMovies'));
  localStorageUser: any[];

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  fetchMovies() {
    this.localStorageUser = JSON.parse(localStorage.getItem(this.authService.userName));
    this.http.get<Movies[]>(
        'http://my-json-server.typicode.com/moviedb-tech/movies/list')
         .subscribe(response => {
          this.movies = response;
           // tslint:disable-next-line:prefer-for-of
          for (const i of this.localStorageUser) {
              this.addFav(i, true);
            }
     });
  }

  addFav(id: number, inLoad?: boolean) {
    const found = this.likedMovies.some(el => el.id === id);
    if (!found) {
      this.likedMovies = this.likedMovies
          .concat(this.movies
              .find(d => d.id === id));
      this.likedMovie = this.movies.find(el => el.id === id);
      this.likedMovie.onFav = true;
      if (!inLoad) {
        this.localStorageUser = this.likedMovies.map(item => item.id);
        localStorage.setItem(this.authService.userName, JSON.stringify(this.localStorageUser));
      }
    }
  }

  removeFav(id: number) {
    const found = this.likedMovies.some(el => el.id === id);
    if (found) {
      this.likedMovies = this.likedMovies
          .filter(d => d.id !== id);
      this.likedMovie = this.movies.find(el => el.id === id);
      this.likedMovie.onFav = false;
      this.localStorageUser = this.localStorageUser.filter(d => d !== id);
      localStorage.setItem(this.authService.userName, JSON.stringify(this.localStorageUser));
    }
  }
}
