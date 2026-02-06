package com.unifecaf.management.Marketplace.Services;

import com.unifecaf.management.Marketplace.Models.Brand;
import com.unifecaf.management.Marketplace.Models.Product;
import com.unifecaf.management.Marketplace.Models.Photo;
import com.unifecaf.management.Marketplace.Repositories.RepositoryBrand;
import com.unifecaf.management.Marketplace.Repositories.RepositoryMarketplace;
import com.unifecaf.management.Marketplace.Repositories.RepositoryPhotos;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServicesMarketplace {

    // Dependence injection for RepositoryCarDealS, RepositoryBrand and RepositoryPhoto.
    private final RepositoryMarketplace repositoryCarDeals;
    private final RepositoryBrand repositoryBrand;
    private final RepositoryPhotos repositoryPhotos;

    public ServicesMarketplace(RepositoryMarketplace repositoryCarDeals,
                               RepositoryBrand repositoryBrand,
                               RepositoryPhotos repositoryPhotos) {

        this.repositoryCarDeals = repositoryCarDeals;
        this.repositoryBrand = repositoryBrand;
        this.repositoryPhotos = repositoryPhotos;
    }

    public Product getCarById(Integer id) {
        // This function retrieves a Car object by ID.
        return repositoryCarDeals.findById(id).orElse(null);
    }

    public List<Product> getAllCars() {
        // This function retrieves all Cars stored in the database.
        return repositoryCarDeals.findAll();
    }

    public Product saveCar(Product car) {
        // This function saves a new Car object in the database.
        return repositoryCarDeals.save(car);
    }

    public void deleteCarById(Integer id) {
        // This function deletes a Car by id.
        repositoryCarDeals.deleteById(id);
    }

    public List<Brand> getAllBrands() {
        // This function retrieves all Brands stored in the database.
        return repositoryBrand.findAll();
    }

    public List<Brand> getAllCarsBrands() {
        // This function retrieves all Brands with cars available stored in the database.
        return repositoryBrand.findBrandsWithCarsAvailable();
    }

    public Brand checkExistingBrand(String brand) {
        // This function checks if a brand exists in the database.
        // It returns the Brand object if it exists, otherwise returns null.
        return repositoryBrand.findByName(brand);
    }

    public Brand saveBrand(Brand brand) {
        // This function saves a new Brand object in the database.
        return repositoryBrand.save(brand);
    }

    public List<Product> findAllByBrand(Brand brand) {
        // This function retrieves all Cars by a specific brand.
        return repositoryCarDeals.findByBrand(brand);
    }

    public List<Product> findAllByModel(String model) {
        // This function retrieves all Cars by a specific model.
        return repositoryCarDeals.findByModel(model);
    }

    public Photo savePhoto(Photo photo) {
        // This function saves a new Photo object in the database.
        return repositoryPhotos.save(photo);
    }

    public Photo getPhotoById(Integer id) {
        // This function retrieves a Photo object by ID.
        return repositoryPhotos.findById(id).orElse(null);
    }
}