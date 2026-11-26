import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { MovieCreate }
from './components/moviecreate/moviecreate';

import { Movielist }
from './components/movielist/movielist';

import { Showmovie }
from './components/showmovie/showmovie';

import { MovieUpdate }
from './components/movie-update/movie-update';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },

  {
    path: 'movies',
    component: Movielist
  },

  {
    path: 'moviecreate',
    component: MovieCreate
  },

  {
    path: 'movie-by-id',
    component: Showmovie
  },
  {
    path: 'movie-update',
    component: MovieUpdate
  },

  {
    path: 'movie-update/:movieId',
    component: MovieUpdate
  },

  {
    path: '**',
    redirectTo: 'movies'
  }

];


@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]

})

export class AppRoutingModule {}
