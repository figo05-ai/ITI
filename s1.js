document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".product-grid"),
    filterButtonsContainer = document.querySelector(".filter-buttons");
  let allProducts = [],
    productCategories = new Set();

  function renderFilters() {
    filterButtonsContainer.innerHTML = "";
    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.dataset.filter = "all";
    allBtn.classList.add("active");
    filterButtonsContainer.appendChild(allBtn);
    [...productCategories].forEach((category) => {
      const btn = document.createElement("button");
      btn.textContent = category;
      btn.dataset.filter = category;
      filterButtonsContainer.appendChild(btn);
    });
    filterButtonsContainer.querySelectorAll("button").forEach((btn) =>
      btn.addEventListener("click", () => {
        filterButtonsContainer
          .querySelectorAll("button")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(btn.dataset.filter);
      })
    );
  }

  function renderProducts(filter) {
    productGrid.innerHTML = "";
    let products = allProducts;
    if (filter !== "all")
      products = allProducts.filter((p) => p.category === filter);
    if (products.length) {
      productGrid.classList.add("center-items");
      products.forEach((p) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
                            <img src="${p.thumbnail}" alt="${p.title}">
                            <h4>${p.title}</h4>
                            <div class="price">$${p.price.toFixed(2)}</div>
                            <div class="cart-button">Add to Cart</div>
                        `;
        productGrid.appendChild(card);
      });
    } else {
      productGrid.innerHTML = "<p>No products found for this filter.</p>";
    }
  }

  const emailInput = document.getElementById("newsletterEmail");
  const subscribeBtn = document.getElementById("subscribeBtn");
  const newsletterMsg = document.getElementById("newsletterMsg");

  function validateEmail(email) {
    return (
      email.indexOf("@") > 0 && email.indexOf(".") > email.indexOf("@") + 1
    );
  }

  emailInput.addEventListener("input", function () {
    if (emailInput.value.trim() === "") {
      emailInput.style.border = "";
      newsletterMsg.style.display = "none";
    } else if (validateEmail(emailInput.value)) {
      emailInput.style.border = "2px solid green";
      newsletterMsg.style.display = "none";
    } else {
      emailInput.style.border = "2px solid red";
      newsletterMsg.style.display = "block";
      newsletterMsg.textContent = "Invalid email address";
    }
  });

  subscribeBtn.addEventListener("click", function () {
    if (validateEmail(emailInput.value)) {
      alert("Your subscription was sent successfully");
      emailInput.value = "";
      emailInput.style.border = "";
      newsletterMsg.style.display = "none";
    } else {
      emailInput.style.border = "2px solid red";
      newsletterMsg.style.display = "block";
      newsletterMsg.textContent = "Invalid email address";
    }
  });

  fetch("https://dummyjson.com/carts/38")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data.products;

      allProducts.forEach((p) => {
        if (p.price < 50) p.category = "Budget";
        else if (p.price < 150) p.category = "Standard";
        else p.category = "Premium";
      });

      allProducts.forEach((p) => productCategories.add(p.category));

      renderFilters();
      renderProducts("all");
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      productGrid.innerHTML =
        "<p>Failed to load products. Please try again later.</p>";
    });
});
