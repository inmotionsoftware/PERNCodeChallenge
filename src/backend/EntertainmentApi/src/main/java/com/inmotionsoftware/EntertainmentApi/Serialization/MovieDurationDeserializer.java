package com.inmotionsoftware.EntertainmentApi.Serialization;

import java.util.Collection;
import java.io.IOException;
import java.time.Duration;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

public class MovieDurationDeserializer extends JsonDeserializer<Duration>{
    @Override
    public Duration deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = p.getCodec().readTree(p);

        if(node.isNull()) {
            return null;
        }

        int hours = node.get("hours").asInt();
        int minutes = node.get("minutes").asInt();
        return Duration.ofMinutes(hours * 60 + minutes);
    }
}
