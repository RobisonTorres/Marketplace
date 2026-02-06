package com.unifecaf.management.Marketplace.Dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

// BCWrapperDto.java - Wrapper DTO for Brand and Car.
// This class serves as a container for BrandDto and CarDto, ensuring that both are provided and valid.''
public class BCWrapperDto {

    @Valid
    @NotNull(message = "brandDto is required")
    private BrandDto brandDto;

    @Valid
    @NotNull(message = "carDto is required")
    private ProductDto carDto;

    private List<PhotoDto> photoDtos;

    public BrandDto getBrandDto() {
        return brandDto;
    }

    public void setBrandDto(BrandDto brandDto) {
        this.brandDto = brandDto;
    }

    public ProductDto getCarDto() {
        return carDto;
    }

    public void setCarDto(ProductDto carDto) {
        this.carDto = carDto;
    }

    public List<PhotoDto> getPhotoDtos() {
        return photoDtos;
    }

    public void setPhotoDtos(List<PhotoDto> photoDtos) {
        this.photoDtos = photoDtos;
    }
}