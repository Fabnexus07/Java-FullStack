package com.bmsce.spmoviecrudrepository.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.bmsce.spmoviecrudrepository.entity.Movie;
import com.bmsce.spmoviecrudrepository.exception.MovieNotFoundException;
import com.bmsce.spmoviecrudrepository.service.MovieService;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    // Constructor Injection
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @RequestMapping(value = "/{movieId}",
                    method = RequestMethod.GET)
    public Movie getMovieById(
            @PathVariable Integer movieId) throws MovieNotFoundException {

        return movieService.getMovieById(movieId);
    }


    @RequestMapping(method = RequestMethod.GET)
    public List<Movie> getAllMovies() {

        return movieService.getAllMovies();
    }

    @PostMapping
    public ResponseEntity<Movie> addMovie(
            @RequestBody Movie movie) {

        Movie savedMovie = movieService.addMovie(movie);

        return new ResponseEntity<>(
                savedMovie, HttpStatus.CREATED);
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<Movie> updateMovie(
            @PathVariable Integer movieId,
            @RequestBody Movie movie) throws MovieNotFoundException {

        if (!movieId.equals(movie.getMovieId())) {

            return ResponseEntity.badRequest().build();
        }

        Movie updatedMovie =
                movieService.updateMovie(movieId, movie);

        return new ResponseEntity<>(
                updatedMovie, HttpStatus.OK);
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> deleteMovie(
            @PathVariable Integer movieId) throws MovieNotFoundException {

        movieService.deleteMovie(movieId);

        return new ResponseEntity<>(
                HttpStatus.NO_CONTENT);
    }
}