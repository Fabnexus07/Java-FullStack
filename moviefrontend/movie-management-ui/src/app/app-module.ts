import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Movielist } from './components/movielist/movielist';
import { Showmovie } from './components/showmovie/showmovie';
import { MovieCreate } from './components/moviecreate/moviecreate';
import { MovieUpdate } from './components/movie-update/movie-update';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [App, Movielist, Showmovie, MovieCreate, MovieUpdate],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
