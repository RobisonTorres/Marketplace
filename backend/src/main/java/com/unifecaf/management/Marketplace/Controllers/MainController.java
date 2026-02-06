package com.unifecaf.management.Marketplace.Controllers;

import com.unifecaf.management.Marketplace.Dtos.BCWrapperDto;
import com.unifecaf.management.Marketplace.Dtos.BrandDto;
import com.unifecaf.management.Marketplace.Dtos.PhotoDto;
import com.unifecaf.management.Marketplace.Dtos.ProductDto;
import com.unifecaf.management.Marketplace.Models.Brand;
import com.unifecaf.management.Marketplace.Models.Product;
import com.unifecaf.management.Marketplace.Models.Photo;
import com.unifecaf.management.Marketplace.Services.ServicesMarketplace;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*")  // Configure CORS to allow requests.

public class MainController {

    private final ServicesMarketplace servicesCarDeals;
    private final ModelMapper modelMapper;
    public MainController(ServicesMarketplace servicesCarDeals, ModelMapper modelMapper) {

        this.servicesCarDeals = servicesCarDeals;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/all_cars")
    public List<Product> allCars() {

        return servicesCarDeals.getAllCars();
    }

    @GetMapping("/get_car/{id}")
    public Product getById(@PathVariable Integer id) {

        Product car = servicesCarDeals.getCarById(id);
        if (car == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return car;
    }

    @PostMapping("/create_car")
    public ResponseEntity<Product> createCar(@Valid @RequestBody BCWrapperDto bcWrapperDto) {

        ProductDto carDto = bcWrapperDto.getCarDto();
        Product car = modelMapper.map(carDto, Product.class);

        BrandDto brandDto = bcWrapperDto.getBrandDto();
        Brand brand = modelMapper.map(brandDto, Brand.class);

        Brand checkBrand = servicesCarDeals.checkExistingBrand(brand.getName());
        car.setBrand(checkBrand == null ? brand : checkBrand);
        if (checkBrand == null) servicesCarDeals.saveBrand(brand);

        servicesCarDeals.saveCar(car);

        List<PhotoDto> photos = bcWrapperDto.getPhotoDtos();
        for (PhotoDto p: photos) {
            Photo photo = modelMapper.map(p, Photo.class);
            photo.setCar(car);
            servicesCarDeals.savePhoto(photo);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/all_brands")
    public List<Brand> getAllBrand() {

        return servicesCarDeals.getAllBrands();
    }

    @GetMapping("/all_brands_available")
    public List<Brand> getAllBrandWithCarsAvailable() {

        return servicesCarDeals.getAllCarsBrands();
    }

}