const luxuryProducts = [
    {
        id: 1,
        title: "Chronograph Matte Black",
        price: "$42,500 USD",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=600&auto=format&fit=crop"
        ],
        timeLeft: "14h 22m",
        description: "Engineered with a high-precision automatic movement and housed in an ultra-matte diamond-like carbon steel casing. A tactical masterpiece that blends contemporary stealth aesthetics with heritage Swiss horology."
    },
    {
        id: 2,
        title: "Minimal Gold Essence",
        price: "$68,900 USD",
        images: [
            "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop"
        ],
        timeLeft: "05h 08m",
        description: "Crafted in solid 18-karat brushed yellow gold, featuring an ultra-slim structural profile and an unadorned champagne dial. Designed for the purist who understands that true luxury speaks in a whisper."
    },
    {
        id: 3,
        title: "Noir Luxury Fragrance",
        price: "$12,200 USD",
        images: [
            "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=600&auto=format&fit=crop"
        ],
        timeLeft: "21h 45m",
        description: "An intense, enigmatic olfactory journey opening with rare black pepper and dark patchouli, layered beautifully over a dense base of absolute amber and royal Tuscan leather. Exceptionally long-lasting."
    }
];

let cart = [];

const catalogView = document.getElementById("catalog-view");
const catalogContainer = document.getElementById("catalog-container");
const detailContainer = document.getElementById("product-detail-container");
const loginContainer = document.getElementById("login-container");

window.addEventListener("popstate", function(event) {
    if (event.state && event.state.view) {
        switchView(event.state.view, event.state.productId, false);
    } else {
        switchView("catalog", null, false);
    }
});

function navigateTo(view, productId = null) {
    switchView(view, productId, true);
}

function switchView(view, productId, pushToHistory) {
    catalogView.classList.add("hidden");
    detailContainer.classList.add("hidden");
    loginContainer.classList.add("hidden");

    if (pushToHistory) {
        window.history.pushState({ view: view, productId: productId }, "", "");
    }

    if (view === "catalog") {
        renderCatalog();
    } else if (view === "detail") {
        renderDetail(productId);
    } else if (view === "login") {
        renderLogin();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCatalog() {
    catalogContainer.innerHTML = "";
    detailContainer.innerHTML = ""; 
    loginContainer.innerHTML = "";
    
    catalogView.classList.remove("hidden");

    luxuryProducts.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("luxury-card");
        card.innerHTML = `
            <img class="product-img" src="${product.images[0]}" alt="${product.title}" onclick="navigateTo('detail', ${product.id})">
            <h2 class="product-title" onclick="navigateTo('detail', ${product.id})">${product.title}</h2>
            <div class="price">${product.price}</div>
            <div class="timer">Ends in: ${product.timeLeft}</div>
            <button class="btn-vip" onclick="addToCart(${product.id})">Grab Access</button>
        `;
        catalogContainer.appendChild(card);
    });
}

function renderDetail(productId) {
    const product = luxuryProducts.find(p => p.id === productId);
    if (!product) return;

    detailContainer.classList.remove("hidden");

    let thumbnailsHtml = "";
    product.images.forEach((imgUrl, index) => {
        thumbnailsHtml += `
            <img class="thumb-img ${index === 0 ? 'active' : ''}" 
                 src="${imgUrl}" 
                 alt="Angle ${index + 1}" 
                 onclick="changeMainImage(this, '${imgUrl}')">
        `;
    });

    detailContainer.innerHTML = `
        <div class="pdp-wrapper">
            <div class="pdp-gallery">
                <div class="pdp-thumbnails">
                    ${thumbnailsHtml}
                </div>
                <div class="pdp-main-image-container">
                    <img id="main-pdp-image" class="pdp-main-img" src="${product.images[0]}" alt="${product.title}">
                </div>
            </div>
            <div class="pdp-info">
                <button class="btn-back" onclick="navigateTo('catalog')">← Back to Private Collection</button>
                <h1 class="pdp-title">${product.title}</h1>
                <div class="pdp-price">${product.price}</div>
                <p class="pdp-description">${product.description}</p>
                <button class="btn-vip" style="width: 350px;" onclick="addToCart(${product.id})">Grab Exclusive Access</button>
            </div>
        </div>
    `;
}

function renderLogin() {
    loginContainer.classList.remove("hidden");
    document.getElementById("side-cart").classList.remove("open");

    loginContainer.innerHTML = `
        <div class="login-wrapper">
            <div class="login-breadcrumb">Home > My Account > Sign In</div>
            <h2>Sign In</h2>
            <div class="login-form">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="e.g.: mail@example.com" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="e.g.: yourpassword" required>
                    <button class="login-link-secondary" style="text-align: left; margin-top: 5px;">Forgot your password?</button>
                </div>
                <button class="btn-vip" style="padding: 16px; margin-top: 10px;" onclick="submitLoginMock()">Sign In</button>
                <div class="login-form-footer">
                    Don't have an account yet? <span onclick="alert('Registration flow under development')">Create account</span>
                </div>
            </div>
        </div>
    `;
}

function changeMainImage(thumbnailElement, newSrc) {
    const allThumbs = document.querySelectorAll('.thumb-img');
    allThumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbnailElement.classList.add('active');
    document.getElementById('main-pdp-image').src = newSrc;
}

function submitLoginMock() {
    alert("Login successful. Redirecting to secure payment gateway...");
    cart = []; 
    updateCartUI();
    navigateTo('catalog'); 
}

function toggleCart() {
    document.getElementById("side-cart").classList.toggle("open");
}

// Control manual del menú hamburguesa lateral izquierdo
function toggleMenu() {
    document.getElementById("side-menu").classList.toggle("open");
}

function addToCart(productId) {
    const productSelected = luxuryProducts.find(p => p.id === productId);
    cart.push(productSelected);
    updateCartUI();
    document.getElementById("side-cart").classList.add("open");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById("cart-count").innerText = cart.length;
    const cartItemsContainer = document.getElementById("cart-items-container");
    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const itemRow = document.createElement("div");
        itemRow.classList.add("cart-item-wrapper");

        let subtextHtml = "";
        if (item.id === 1) {
            subtextHtml = `<div class="cart-item-discount">Unlocked: 15% OFF on Noir Fragrance</div>`;
        } else if (item.id === 2) {
            subtextHtml = `<div class="cart-item-discount">VIP Benefit: Complimentary gift wrapping included</div>`;
        }

        itemRow.innerHTML = `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-title">${item.title}</span>
                    <button class="btn-remove-item" onclick="removeFromCart(${index})">Remove</button>
                </div>
                <span class="cart-item-price">${item.price}</span>
            </div>
            ${subtextHtml}
        `;
        cartItemsContainer.appendChild(itemRow);

        const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        total += numericPrice;
    });

    document.getElementById("cart-total-price").innerText = `$${total.toLocaleString()} USD`;
}

function checkoutAlert() {
    if(cart.length === 0) {
        alert("Your VIP Boutique Bag is empty.");
        return;
    }
    toggleCart(); 
    navigateTo('login'); 
}

window.history.replaceState({ view: "catalog", productId: null }, "", "");
renderCatalog();