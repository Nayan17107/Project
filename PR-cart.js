let AddProduct = document.querySelector("#addproduct");
let Cart = document.querySelector("#productcart");
let Form = document.querySelector("#addproductform");
let AddedPr = document.querySelector("#addedproduct");
let Close = document.querySelector("#close");

let Name = document.querySelector("#prname");
let IMG = document.querySelector("#prurl");
let Details = document.querySelector("#prdetails");
let Price = document.querySelector("#prprice");

AddProduct.addEventListener('click', () => {
    Form.style.display = "block"
    AddedPr.style.display = "block"
})

Close.addEventListener('click', () => {
    Form.style.display = "none"
})

Form.addEventListener('submit', (e) => {
    e.preventDefault();
    let products = JSON.parse(localStorage.getItem("Product")) || [];

    let newproduct = {
        Name : Name.value,
        Img: IMG.value,
        Details : Details.value,
        Price : Price.value
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
                        <button class="btn btn-primary w-100 mt-auto add-to-cart mb-2">Add to Cart</button>
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
