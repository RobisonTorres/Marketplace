async function showAllCars() {

    const url = '/api/cars/all_cars';
    const container = document.getElementById('showAllCars'); 
    container.innerHTML = '';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const cars = await response.json();
        cars.forEach(car => {
            container.appendChild(createCarCard(car));
        });
    } catch (error) {
        console.error('Error fetching cars:', error);
        container.innerHTML = '<div class="col-12 text-center text-danger">Error loading cars.</div>';
    }
}

function createCarCard(car) {

    const template = document.getElementById('car-card-template');
    const clone = template.content.cloneNode(true);
    const carouselId = `carouselCar${car.id}`;
    const carouselEl = clone.querySelector('.car-carousel');
    carouselEl.id = carouselId;  
    clone.querySelector('.indicator-0').setAttribute('data-bs-target', `#${carouselId}`);
    clone.querySelector('.indicator-1').setAttribute('data-bs-target', `#${carouselId}`);
    clone.querySelector('.car-prev-btn').setAttribute('data-bs-target', `#${carouselId}`);
    clone.querySelector('.car-next-btn').setAttribute('data-bs-target', `#${carouselId}`);
    clone.querySelector('.car-img-0').src = car.photos?.[0]?.photo ?? '/imgs/car_deals_logo.png';
    clone.querySelector('.car-price-0').textContent = `$${car.price}`;   
    clone.querySelector('.car-img-1').src = car.photos?.[1]?.photo ?? '/imgs/car_deals_logo.png';
    clone.querySelector('.car-price-1').textContent = `$${car.price}`;
    clone.querySelector('.car-model').textContent = car.model;
    clone.querySelector('.car-brand-color').textContent = `${car.brand.name} • ${car.color}`;
    clone.querySelector('.car-mileage').textContent = `${car.mileage} kg`;
    clone.querySelector('.car-plate').textContent = car.plate;
    clone.querySelector('.car-year').textContent = car.fabrication ?? 'N/A';
    clone.querySelector('.car-status').textContent = car.status;
    
    return clone;
}

const search = document.querySelector('#searchCar');
const allCars = document.querySelector('#showAllCars');
search.addEventListener('input', () => {

    const searchValue = search.value.toLowerCase();
    const cars = allCars.querySelectorAll('.col-md-4');    
    cars.forEach(car => {
        const brandRow = car.querySelector('h3');
        const modelRow = car.querySelector('p');
        
        if (brandRow && modelRow) {
            const carBrand = brandRow.textContent.toLowerCase();
            const carModel = modelRow.textContent.toLowerCase();
            if (!carBrand.includes(searchValue) && !carModel.includes(searchValue)) {
                car.style.display = 'none';
            } else {
                car.style.display = '';
            }
        }
    });
});

showAllCars();