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
    fetch('http://localhost:8080/cars/create_car', {
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
            location.reload(true);
        } else {
            alert('Failed to create product.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating product.');
    });
}

function showAllCars() {

    fetch('http://localhost:8080/cars/all_cars', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        let output = ``;
        data.forEach(car => {
            output += `
                    <div id="cards" class="col-md-4 mb-4">
                    <div class="card h-100 border-0 shadow-lg rounded-3 overflow-hidden">
                        <div class="position-relative">
                        <div id="carouselCar${car.id}" class="carousel slide" data-bs-ride="carousel">
                            <!-- Indicators -->
                            <div class="carousel-indicators">
                            <button type="button"
                                    data-bs-target="#carouselCar${car.id}"
                                    data-bs-slide-to="0"
                                    class="active"
                                    aria-current="true"
                                    aria-label="Slide 1"></button>
                            <button type="button"
                                    data-bs-target="#carouselCar${car.id}"
                                    data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                            </div>
                            <!-- Images -->
                            <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${car.photos?.[0]?.photo ?? 'imgs/car_deals_logo.png'}"
                                    class="card-img-top img-fluid object-fit-cover"
                                    style="height: 250px;"
                                    alt="Car image"
                                    onerror="this.src='imgs/car_deals_logo.png'">
                                <span class="badge bg-danger position-absolute top-0 start-0 m-2 rounded-pill px-3 py-2 fs-5">
                                $${car.price}
                                </span>
                            </div>
                            <div class="carousel-item">
                                <img src="${car.photos?.[1]?.photo ?? 'imgs/car_deals_logo.png'}"
                                    class="card-img-top img-fluid object-fit-cover"
                                    style="height: 250px;"
                                    alt="Car image"
                                    onerror="this.src='imgs/car_deals_logo.png'">
                                <span class="badge bg-danger position-absolute top-0 start-0 m-2 rounded-pill px-3 py-2 fs-5">
                                $${car.price}
                                </span>
                            </div>
                            </div>
                            <!-- Controls -->
                            <button class="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselCar${car.id}"
                                    data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                            </button>
                            <button class="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselCar${car.id}"
                                    data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                            </button>
                        </div>
                        </div>
                        <!-- Card body -->
                        <div class="card-body d-flex flex-column">
                        <h3 class="card-title mb-2">${car.model}</h3>
                        <p class="text-muted mb-2 fs-5">${car.brand.name} • ${car.color}</p>
                        <ul class="list-group list-group-flush border-top border-bottom my-2">
                            <li class="list-group-item d-flex justify-content-between px-0">
                            <span><i class="bi bi-speedometer2 me-2"></i>Weight</span>
                            <strong>${car.mileage} kg</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between px-0">
                            <span><i class="bi bi-tag me-2"></i>Code</span>
                            <strong>${car.plate}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between px-0">
                            <span><i class="bi bi-calendar me-2"></i>Year</span>
                            <strong>${car.fabrication ?? 'N/A'}</strong>
                            </li>
                            <li class="list-group-item d-flex justify-content-between px-0">
                            <span><i class="bi bi-info-circle me-2"></i>Status</span>
                            <strong class="text-success">${car.status}</strong>
                            </li>
                        </ul>
                        <div class="d-flex gap-2 mt-auto pt-3">
                            <button class="btn btn-outline-primary flex-grow-1">
                            <i class="bi bi-credit-card me-1"></i> Buy
                            </button>
                            <button class="btn btn-outline-danger flex-grow-1">
                            <i class="bi bi-cart-check me-1"></i> Cart
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
            `;});
        document.getElementById('showAllCars').innerHTML = output;
    })
    .catch(error => {
        console.error('Error fetching cars:', error);
        document.getElementById('showAllCars').innerHTML = '<div>Error loading cars.</div>';
    });
}

function hideAllCars() {

    document.getElementById('showAllCars').innerHTML = '';
}

function brandSelect(brandInput, filter_brand) {

    return fetch(`http://localhost:8080/cars/${filter_brand}`, {
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
    const cars = allCars.querySelectorAll('div#cards');    
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