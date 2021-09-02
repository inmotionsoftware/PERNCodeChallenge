package com.inmotionsoftware.EntertainmentApi.Repo;

import com.inmotionsoftware.EntertainmentApi.Domain.Person;

import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Long> {
    
}
