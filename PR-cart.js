let AddProduct = document.querySelector("#addproduct");
let Cart = document.querySelector("#productcart");
let Form = document.querySelector("#addproductform");
let AddedPr = document.querySelector("#addedproduct");
let Close = document.querySelector("#close");
let Cartpr = document.querySelector("#cartpr");

let Name = document.querySelector("#prname");
let IMG = document.querySelector("#prurl");
let Details = document.querySelector("#prdetails");
let Price = document.querySelector("#prprice");

AddProduct.addEventListener('click', () => {
    Form.style.display = "block"
    AddedPr.style.display = "block"
    Cartpr.style.display = "none"
})

Close.addEventListener('click', () => {
    Form.style.display = "none"
})

Form.addEventListener('submit', (e) => {
    e.preventDefault();
    let products = JSON.parse(localStorage.getItem("Product")) || [];
    let id = Math.floor(Math.random() * 90000) + 10000;

    let newproduct = {
        id: id,
        Name: Name.value,
        Img: IMG.value,
        Details: Details.value,
        Price: Price.value
    }
    products.push(newproduct);
    localStorage.setItem("Product", JSON.stringify(products));
    Form.reset();
    DisplayProduct();
})

// Display Product

function DisplayProduct() {
    let products = JSON.parse(localStorage.getItem("Product"));
    let data = '<div class="row">';

    products.forEach((product, index) => {
        let i = `
            <div class="col-md-4 d-flex mb-4">
                <div class="card product-card w-100">
                    <img src="${product.Img}" class="card-img-top" alt="${product.Name}">
                    <div class="card-body p-3 d-flex flex-column">
                        <h5 class="card-title fw-bold">${product.Name}</h5>
                        <p class="card-text">${product.Details}</p>
                        <p class="fw-bold text-success">${product.Price}₹</p>
                        <button class="btn btn-primary w-100 mt-auto add-to-cart mb-2" onclick="AddtoCart(${index})">Add to Cart</button>
                        <button class="btn btn-danger w-100 mt-auto add-to-cart" onclick="DeleteProduct(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `;
        data += i;
    });

    data += '</div>';
    AddedPr.innerHTML = data;
}
DisplayProduct();

// Add to Cart 

function AddtoCart(index) {
    let products = JSON.parse(localStorage.getItem("Product"));
    let Cart = JSON.parse(localStorage.getItem("Cart")) || [];

    let indexvalue = products[index];

    let checkcart = Cart.some((item) => {
        if (item.id === indexvalue.id) {
            item.quantity += 1;
            return true;
        }
        return false;
    });

    if (!checkcart) {
        indexvalue.quantity = 1;
        Cart.push(indexvalue);
    }
    // Cart.push(products[index]);
    localStorage.setItem("Cart", JSON.stringify(Cart));
}

// Delete Product 

function DeleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("Product"));
    products.splice(index, 1);
    localStorage.setItem("Product", JSON.stringify(products));
    DisplayProduct();
}


// Cart 

Cart.addEventListener('click', () => {
    Form.style.display = "none"
    AddedPr.style.display = "none"
    AddProduct.style.display = "none"
    Cartpr.style.display = "block"

    CartProduct();
})


function CartProduct() {
    let Cart = JSON.parse(localStorage.getItem("Cart")) || [];
    let m = '<h2 class="mb-4">🛒 Your Cart</h2>';

    Cart.forEach((Cart) => {
        let n = `
            <div class="row product-card align-items-center">
                <div class="col-md-2 text-center">
                    <img src="${Cart.Img}" alt="Product Image" class="img-fluid product-img cartprimg">
                </div>
                <div class="col-md-3">
                    <h5 class="mb-1">${Cart.Name}</h5>
                </div>
                <div class="col-md-4 d-flex align-items-center">
                    <div class="quantity-controls d-flex align-items-center">
                        <button class="btn btn-outline-danger btn-sm me-2" onclick="minus(${Cart.id})">−</button>
                        <span class="quantity-value">${Cart.quantity}</span>
                        <button class="btn btn-outline-success btn-sm ms-2" onclick="plus(${Cart.id})">+</button>
                    </div>
                    <button class="btn btn-danger w-100 mt-auto" onclick="Delfromcart(${Cart.id})">Delete</button>
                </div>
                <div class="col-md-3 text-end total-price">Price: ${Cart.Price * Cart.quantity}₹</div>
            </div>
            `
        m += n;
    })
    let total = 0;
    Cart.forEach(item => {
        total += parseFloat(item.Price) * item.quantity;
    });

    m += `<div id="cart-total">Total: <span class="inr">₹${total.toFixed(2)}</span></div>`;

    Cartpr.innerHTML = m;
}
CartProduct();

// Delete Product From Cart

function Delfromcart(id) {
    let Cart = JSON.parse(localStorage.getItem("Cart")) || [];

    Cart.forEach((item, index) => {
        if (item.id === id) {
            Cart.splice(index, 1);
        }
    });
    localStorage.setItem("Cart", JSON.stringify(Cart));
    CartProduct();
}

// Minus

function minus(id) {
    let Cart = JSON.parse(localStorage.getItem("Cart")) || [];

    Cart.forEach(item => {
        if (item.id === id && item.quantity > 1) {
            item.quantity--;
        }
    })
    localStorage.setItem("Cart", JSON.stringify(Cart));
    CartProduct();
}

// Plus

function plus(id) {
    let Cart = JSON.parse(localStorage.getItem("Cart")) || [];

    Cart.forEach(item => {
        if (item.id === id) {
            item.quantity++;
        }
    })
    localStorage.setItem("Cart", JSON.stringify(Cart));
    CartProduct();
}