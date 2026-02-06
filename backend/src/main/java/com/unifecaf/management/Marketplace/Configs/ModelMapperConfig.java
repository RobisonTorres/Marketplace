package com.unifecaf.management.Marketplace.Configs;

import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public Hibernate6Module hibernate6Module() {
        return new Hibernate6Module();
    }
}