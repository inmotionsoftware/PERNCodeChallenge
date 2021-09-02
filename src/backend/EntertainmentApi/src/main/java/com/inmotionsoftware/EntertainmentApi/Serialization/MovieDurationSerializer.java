package com.inmotionsoftware.EntertainmentApi.Serialization;

import java.io.IOException;
import java.time.Duration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class MovieDurationSerializer extends JsonSerializer<Duration>{

    @Override
    public void serialize(Duration value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("hours", Integer.toString(value.toHoursPart()));
        gen.writeStringField("minutes", Integer.toString(value.toMinutesPart()));
        gen.writeEndObject();
    }
    
}
