package com.inmotionsoftware.EntertainmentApi.Api;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.inmotionsoftware.EntertainmentApi.Domain.Movie;
import com.inmotionsoftware.EntertainmentApi.Repo.MovieRepository;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MoviesController {
    private final MovieRepository repository;

    MoviesController(MovieRepository repository) {
      this.repository = repository;
    }

    @GetMapping("/movies")
    Iterable<Movie> movies() {
        return repository.findAll();
    }

    @GetMapping("/movies/{movieId}")
    Movie movie(@PathVariable long movieId) throws NotFoundException {
        Movie result = repository.findById(movieId).orElseThrow(() -> new NotFoundException());
        return result;
    }
}
