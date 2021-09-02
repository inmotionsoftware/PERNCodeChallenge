package com.inmotionsoftware.EntertainmentApi.Domain;

import com.inmotionsoftware.EntertainmentApi.Serialization.MovieDurationDeserializer;
import com.inmotionsoftware.EntertainmentApi.Serialization.MovieDurationSerializer;

import java.util.Date;
import java.util.Set;
import java.time.Duration;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;

import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.vladmihalcea.hibernate.type.interval.PostgreSQLIntervalType;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
@TypeDef(
    typeClass = PostgreSQLIntervalType.class,
    defaultForType = Duration.class
)
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long movieId;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    private String title;
    private String ratingClassification;
    private String description;
    private Date releaseDate;
    private float avgRating;

    @JsonSerialize(using = MovieDurationSerializer.class)
    @JsonDeserialize(using = MovieDurationDeserializer.class)
    private Duration runtime;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "cast_role",
        joinColumns = @JoinColumn(name = "movie_id"), 
        inverseJoinColumns = @JoinColumn(name = "person_id")
    )
    @JsonIgnoreProperties("roles")
    Set<Person> cast;
}
