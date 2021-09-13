const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h4>Rating: ${product.rating.rate}</h4>
      <h4>Total Rated: ${product.rating.count} person</h4>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary me-3">add to cart</button>
      <button onclick="showDetails(${product.id})" id="details-btn" class="btn btn-dark  ms-3" data-bs-toggle="modal"
      data-bs-target="#exampleModal">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

const showDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showDetailsOfProduct(data));
}

const showDetailsOfProduct = (product) => {
  document.getElementById("product-heading").innerText = '';
  document.getElementById("each-product").innerText = '';
  const div2 = document.createElement("div");
  const div1 = document.createElement("h3");
  div1.innerHTML = `
    <div class="text-center">
      <h3>${product.title}</h3>
    </div>
  `;
  document.getElementById("product-heading").appendChild(div1);
  div2.innerHTML = `
    <div class="text-center">
      <div>
        <img class="product-image mx-auto d-block" src=${product.image}></img>
      </div>
      <p>Category: ${product.category}</p>
      <h4>Rating: ${product.rating.rate}</h4>
      <h4>Total Rated: ${product.rating.count} person</h4>
      <h2>Price: $ ${product.price}</h2>
      <p>${product.description}</p>
    </div>
  `;
  document.getElementById("each-product").appendChild(div2);
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
