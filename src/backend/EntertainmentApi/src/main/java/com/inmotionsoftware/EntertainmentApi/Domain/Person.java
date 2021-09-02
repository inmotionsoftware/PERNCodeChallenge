package com.inmotionsoftware.EntertainmentApi.Domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long personId;

    private String name;
    private String location; //Not sure if geopoint or like a general city, state thing here.
    private Date born;
    private Date died;
    private String description;
    private String thumbnailAsset;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "cast")
    @JsonIgnoreProperties("cast")
    Set<Movie> roles;
}
