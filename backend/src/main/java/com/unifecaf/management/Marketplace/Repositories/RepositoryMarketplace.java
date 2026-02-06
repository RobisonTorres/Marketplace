package com.unifecaf.management.Marketplace.Repositories;

import com.unifecaf.management.Marketplace.Models.Brand;
import com.unifecaf.management.Marketplace.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RepositoryMarketplace extends JpaRepository <Product, Integer> {

    List<Product> findByBrand(Brand brand);
    List<Product> findByModel(String model);

}