document.getElementById('addNewCar').addEventListener('click', displayForm);
function displayForm() {

    const input = document.getElementById('brand');
    if (input.options.length <= 1) {
        brandSelect(input, 'all_brands');
    }
    const form = document.getElementById('popForm');
    return form.style.display = 'block';
}

document.getElementById('closeForm').addEventListener('click', closeForm);
function closeForm(event) {

    const form = document.getElementById('popForm');
    return form.style.display = 'none';
}

function createCar(event) {

    event.preventDefault();
    let brandSelect = document.getElementById('brand');
    let brandInput = brandSelect.options[brandSelect.selectedIndex].text;
    if (brandInput === 'Other') {
        brandInput = document.getElementById('brandNew').value;
    }
    const brand = {
        id: parseInt(brandSelect.options[brandSelect.selectedIndex].value, 10),
        name: brandInput
    }
    const car = {
        model: document.getElementById('model').value,
        fabrication: parseInt(document.getElementById('fabrication').value, 10),
        color: document.getElementById('color').value,
        mileage: parseInt(document.getElementById('mileage').value, 10),
        plate: document.getElementById('plate').value,
        price: document.getElementById('price').value,
        status: document.getElementById('status').value
    };
    if (!car.model || !car.fabrication || !car.color || !car.plate || !car.price || !car.status) {
        alert('Please fill in all fields.');    
        return;
    };
    const photos = [
        {photo: document.getElementById('main_image').value},
        {photo: document.getElementById('secondary_image').value}
    ];
    const bcWrapperDtoCreate = {
        brandDto: brand,
        carDto: car,
        photoDtos: photos
    }; 
    fetch('/api/cars/create_car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bcWrapperDtoCreate)
    })
    .then(response => {
        if (response.ok) {
            alert('Product created successfully!');
            document.querySelector('form').reset();
            closeForm(event);
        
        } else {
            alert('Failed to create product.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating product.');
    });
}

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

function hideAllCars() {

    document.getElementById('showAllCars').innerHTML = '';
}

function brandSelect(brandInput, filter_brand) {

    return fetch(`/api/cars/${filter_brand}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(brand => {
            const newOption = document.createElement('option');
            newOption.value = brand.id;
            newOption.text = brand.name;
            brandInput.appendChild(newOption);
        });
        if (filter_brand != 'all_brands_available') {
            const newOption = document.createElement('option');
            newOption.value = 'Other';
            newOption.text = 'Other';   
            brandInput.appendChild(newOption);
        }
    })
}

function addNewBrand(event) {
    
    const select = event.target;
    const brandNewInput = document.getElementById('brandNew');
    const brandUpdateInput = document.getElementById('brandUpdate');
    if (select.value === 'Other') {
        brandNewInput.style.display = 'block';
        brandUpdateInput.style.display = 'block';
    } else {
        brandNewInput.style.display = 'none';
        brandNewInput.style.display = 'none';
    }
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