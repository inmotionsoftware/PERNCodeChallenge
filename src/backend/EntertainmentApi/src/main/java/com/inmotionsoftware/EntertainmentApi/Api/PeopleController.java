package com.inmotionsoftware.EntertainmentApi.Api;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.inmotionsoftware.EntertainmentApi.Domain.Person;
import com.inmotionsoftware.EntertainmentApi.Repo.PersonRepository;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PeopleController {
    private final PersonRepository repository;

    PeopleController(PersonRepository repository) {
      this.repository = repository;
    }

    @GetMapping("/people")
    Iterable<Person> people() {
        return repository.findAll();
    }

    @GetMapping("/people/{personId}")
    Person person(@PathVariable long personId) throws NotFoundException {
        Person result = repository.findById(personId).orElseThrow(() -> new NotFoundException());
        return result;
    }
}
