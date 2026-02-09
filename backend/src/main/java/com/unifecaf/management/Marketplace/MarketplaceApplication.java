package com.unifecaf.management.Marketplace;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MarketplaceApplication {

	public static void main(String[] args) {

		SpringApplication.run(MarketplaceApplication.class, args);
	}

	@Bean
	CommandLineRunner initialization () {
		return args -> {

			System.out.println("Fox Two!");
		};
	}
}