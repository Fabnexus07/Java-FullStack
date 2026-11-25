
package com.bmsce.spmoviecrudvalidation.controller;

import java.util.Set;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bmsce.spmoviecrudvalidation.entity.Movie;
import com.bmsce.spmoviecrudvalidation.exception.DuplicateMovieException;
import com.bmsce.spmoviecrudvalidation.exception.InvalidMovieException;
import com.bmsce.spmoviecrudvalidation.exception.MovieNotFoundException;
import com.bmsce.spmoviecrudvalidation.service.MovieService;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    // 1. GET MOVIE BY ID
    @RequestMapping(value = "/{movieId}", method = RequestMethod.GET)
    public Movie getMovieById(@PathVariable Integer movieId) throws MovieNotFoundException {

        return movieService.getMovieById(movieId);
    }

    // 2. GET ALL MOVIES
    @RequestMapping(method = RequestMethod.GET)
    public Set<Movie> getAllMovies() {

        return movieService.getAllMovies();
    }

    // 3. CREATE MOVIE
    @PostMapping
    public ResponseEntity<?> addMovie(
            @Valid @RequestBody Movie movie) throws DuplicateMovieException, InvalidMovieException {

        boolean result = movieService.addMovie(movie);

        if (result) {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(movie);
        }

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("Movie ID already exists");
    }

    // 4. UPDATE MOVIE
    @PutMapping("/{movieId}")
    public ResponseEntity<?> updateMovie(
            @PathVariable Integer movieId,
            @Valid @RequestBody Movie movie) throws InvalidMovieException, MovieNotFoundException {

        boolean result = movieService.updateMovie(movieId, movie);

        if (result) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(movieService.getMovieById(movieId));
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Movie not found with ID: " + movieId);
    }

    // 5. DELETE MOVIE
    @DeleteMapping("/{movieId}")
    public ResponseEntity<?> deleteMovie(
            @PathVariable Integer movieId) throws MovieNotFoundException {

        boolean result = movieService.deleteMovie(movieId);

        if (result) {
            return ResponseEntity
                    .status(HttpStatus.NO_CONTENT)
                    .build();
        }

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Movie not found with ID: " + movieId);
    }
}
