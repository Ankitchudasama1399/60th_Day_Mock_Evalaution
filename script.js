document.addEventListener("DOMContentLoaded", function () {
  const categoryDropdown = document.getElementById("category");
  const searchInput = document.getElementById("search");
  const sortDropdown = document.getElementById("sort");
  const productList = document.getElementById("product-list");

  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json())
    .then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.textContent = category;
        option.value = category;
        categoryDropdown.appendChild(option);
      });
    });

  function fetchAndDisplayProducts() {
    const category = categoryDropdown.value;
    const searchQuery = searchInput.value.toLowerCase();
    const sortOption = sortDropdown.value;

    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((products) => {
        let filteredProducts = products;
        if (category !== "all") {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === category
          );
        }

        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchQuery)
        );

        if (sortOption === "asc") {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else {
          filteredProducts.sort((a, b) => b.price - a.price);
        }

        productList.innerHTML = "";

        filteredProducts.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
      `;
          productList.appendChild(productDiv);
        });
      });
  }

  categoryDropdown.addEventListener("change", fetchAndDisplayProducts);
  searchInput.addEventListener("input", fetchAndDisplayProducts);
  sortDropdown.addEventListener("change", fetchAndDisplayProducts);

  fetchAndDisplayProducts();
});
