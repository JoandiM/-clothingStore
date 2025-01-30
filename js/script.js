AOS.init();

        // Simulación de productos para prueba
        const products = [
            { id: 1, title: "Camisa de Manga Larga", category: "Camisas", image: "images/product1.jpg", description: "Camisa casual para hombre", price: "$20", sizes: ["S", "M", "L"] },
            { id: 2, title: "Pantalones Jeans", category: "Pantalones", image: "images/product2.jpg", description: "Jeans de corte moderno", price: "$35", sizes: ["30", "32", "36"] },
            { id: 3, title: "Chaqueta de Cuero", category: "Chaquetas", image: "images/product3.jpg", description: "Chaqueta de cuero genuino", price: "$80", sizes: ["S", "M", "L"] },
            { id: 4, title: "Suéter de Lana", category: "Suéteres", image: "images/product4.jpg", description: "Suéter de lana para invierno", price: "$50", sizes: ["M", "L"] },
            { id: 5, title: "Gorro de Punto", category: "Accesorios", image: "images/product5.jpg", description: "Gorro de punto para frío", price: "$15", sizes: ["Único"] },
            { id: 6, title: "Zapatillas Deportivas", category: "Calzado", image: "images/product6.jpg", description: "Zapatillas deportivas para correr", price: "$60", sizes: ["40", "42", "44"] },
            { id: 7, title: "Vestido de Noche", category: "Vestidos", image: "images/ropa1.jpg", description: "Vestido elegante para eventos formales", price: "$100", sizes: ["S", "M"] },
            { id: 8, title: "Blusa de Seda", category: "Blusas", image: "images/ropa2.jpg", description: "Blusa elegante de seda", price: "$45", sizes: ["M", "L"] },
            { id: 9, title: "Chaqueta de Plumas", category: "Chaquetas", image: "images/ropa3.jpg", description: "Chaqueta abrigada de plumas", price: "$120", sizes: ["M", "L", "XL"] },
            { id: 10, title: "Camiseta de Algodón", category: "Camisetas", image: "images/ropa1.jpg", description: "Camiseta suave de algodón", price: "$20", sizes: ["S", "M", "L"] },
            { id: 11, title: "Bufanda de Lana", category: "Accesorios", image: "images/ropa2.jpg", description: "Bufanda para el frío", price: "$25", sizes: ["Único"] },
            { id: 12, title: "Zapatos de Cuero", category: "Calzado", image: "images/ropa3.jpg", description: "Zapatos de cuero para hombre", price: "$80", sizes: ["40", "42"] },
            { id: 13, title: "Cartera de Cuero", category: "Accesorios", image: "images/ropa1.jpg", description: "Cartera elegante", price: "$40", sizes: ["Único"] },
            { id: 14, title: "Guantes de Piel", category: "Accesorios", image: "images/ropa2.jpg", description: "Guantes de piel para invierno", price: "$30", sizes: ["Único"] },
            { id: 15, title: "Pantalón de Pana", category: "Pantalones", image: "images/ropa3.jpg", description: "Pantalón de pana para hombre", price: "$55", sizes: ["30", "32", "34"] },
            { id: 16, title: "Abrigo de Invierno", category: "Abrigos", image: "images/ropa1.jpg", description: "Abrigo abrigado para el invierno", price: "$150", sizes: ["L", "XL"] },
            { id: 17, title: "Camiseta de Manga Corta", category: "Camisetas", image: "images/ropa2.jpg", description: "Camiseta de manga corta", price: "$15", sizes: ["S", "M", "L"] },
            { id: 18, title: "Falda de Cuero", category: "Faldas", image: "images/ropa3.jpg", description: "Falda de cuero para mujeres", price: "$60", sizes: ["M", "L"] },
            { id: 19, title: "Chaqueta de Denim", category: "Chaquetas", image: "images/ropa1.jpg", description: "Chaqueta de mezclilla", price: "$75", sizes: ["M", "L"] },
            { id: 20, title: "Botines de Cuero", category: "Calzado", image: "images/ropa2.jpg", description: "Botines de cuero para invierno", price: "$90", sizes: ["40", "42"] },
            { id: 21, title: "Mochila de Cuero", category: "Accesorios", image: "images/ropa3.jpg", description: "Mochila de cuero elegante", price: "$70", sizes: ["Único"] },
            { id: 22, title: "Sudadera con Capucha", category: "Sudaderas", image: "images/ropa1.jpg", description: "Sudadera cómoda", price: "$40", sizes: ["M", "L", "XL"] },
            { id: 23, title: "Bermuda de Algodón", category: "Bermudas", image: "images/ropa2.jpg", description: "Bermuda de algodón para verano", price: "$25", sizes: ["M", "L"] },
            { id: 24, title: "Polo de Algodón", category: "Polos", image: "images/ropa3.jpg", description: "Polo cómodo", price: "$20", sizes: ["S", "M", "L"] }
        ];
    // Función para obtener categorías únicas y tallas por categoría
function getCategoriesAndSizes() {
    const categorySet = new Set();
    const sizeMap = {};

    // Iterar sobre los productos para obtener categorías y tallas
    products.forEach(product => {
        // Agregar la categoría al set
        categorySet.add(product.category);

        // Si la categoría aún no tiene una lista de tallas, la inicializamos
        if (!sizeMap[product.category]) {
            sizeMap[product.category] = new Set();
        }

        // Agregar las tallas del producto a la lista de tallas de su categoría
        product.sizes.forEach(size => sizeMap[product.category].add(size));
    });

    return { categories: Array.from(categorySet), sizes: sizeMap };
}

// Obtener las categorías y tallas dinámicamente
const { categories, sizes } = getCategoriesAndSizes();

// Obtener los elementos select de categorías y tallas
const categorySelect = document.getElementById('categoryFilter');
const sizeSelect = document.getElementById('sizeFilter');

// Rellenar las categorías en el filtro
categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
});

       
    let currentPage = 1;
    let itemsPerPage = 6;
    let visibleItems = 6;
    let filtered = false;

    function displayProducts(productsToDisplay = products.slice(0, visibleItems)) {
        const productContainer = document.getElementById('products');
        productContainer.innerHTML = "";
        productsToDisplay.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <div class="card product-card" data-aos="zoom-out-up" data-bs-toggle="modal" data-bs-target="#productModal" onclick="openProductModal(${product.id})">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>${product.price}</strong></p>
                    </div>
                </div>
            `;
            productContainer.appendChild(productElement);
        });
        AOS.refresh(); // Refrescar las animaciones de AOS
    }

    function displayPagination() {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        let paginationContainer = document.getElementById('paginationContainer');
        paginationContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('li');
            pageButton.classList.add('page-item');
            if (i === currentPage) {
                pageButton.classList.add('active');
                pageButton.innerHTML = `
                    <span class="page-link">${i}</span>
                `;
            } else {
                pageButton.innerHTML = `
                    <a class="page-link hover-animate" href="#" onclick="changePage(event, ${i})">${i}</a>
                `;
            }
            paginationContainer.appendChild(pageButton);
        }
        AOS.refresh(); // Refrescar las animaciones de AOS
    }

    function changePage(event, page) {
        event.preventDefault();
        currentPage = page;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        displayProducts(products.slice(start, end));
        displayPagination();
    }

    function loadMoreProducts() {
        visibleItems = products.length;
        displayProducts(products.slice(0, itemsPerPage));
        document.getElementById('loadMoreBtn').style.display = 'none';
        document.getElementById('showLessBtn').style.display = 'block';
        document.getElementById('paginar').style.display = 'block';
        displayPagination();
    }

    function showLessProducts() {
        visibleItems = itemsPerPage;
        displayProducts(products.slice(0, itemsPerPage));
        document.getElementById('loadMoreBtn').style.display = 'block';
        document.getElementById('showLessBtn').style.display = 'none';
        document.getElementById('paginar').style.display = 'none';
    }

    function openProductModal(productId) {
        const product = products.find(p => p.id === productId);
        document.getElementById('modalProductImg').src = product.image;
        document.getElementById('modalProductDescription').innerText = product.description;
        const sizesContainer = document.getElementById('modalProductSizes');
        sizesContainer.innerHTML = "";
        product.sizes.forEach(size => {
            const sizeOption = document.createElement('span');
            sizeOption.classList.add('size-option');
            sizeOption.innerText = size;
            sizeOption.onclick = () => sizeOption.classList.toggle('selected');
            sizesContainer.appendChild(sizeOption);
        });
    }

    function clearSearch() {
        document.getElementById('search').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('sizeFilter').value = '';
        document.getElementById('noResultsMessage').style.display = 'none';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        displayProducts(products.slice(start, end)); // Mostrar productos de la página actual
        displayPagination();
        document.getElementById('paginar').style.display = 'block'; // Mostrar el paginador
        document.getElementById('loadMoreBtn').style.display = 'none'; // Ocultar el botón de cargar más
        document.getElementById('showLessBtn').style.display = 'none'; // Ocultar el botón de mostrar menos
        filtered = false; // Resetear el estado de filtro
}


function filterProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const categoryValue = document.getElementById('categoryFilter').value;
    const sizeValue = document.getElementById('sizeFilter').value;

    const filteredProducts = products.filter(product => {
        const matchCategory = categoryValue === "" || product.category === categoryValue;
        const matchSize = sizeValue === "" || product.sizes.includes(sizeValue);
        const matchSearch = query === "" || product.title.toLowerCase().includes(query);
        return matchCategory && matchSize && matchSearch;
    });

    if (filteredProducts.length > 0) {
        displayProducts(filteredProducts);
        document.getElementById('noResultsMessage').style.display = 'none';
        document.getElementById('paginar').style.display = 'none'; // Ocultar el paginador durante la búsqueda
        document.getElementById('loadMoreBtn').style.display = 'none'; // Ocultar el botón de cargar más durante la búsqueda
        document.getElementById('showLessBtn').style.display = 'none'; // Ocultar el botón de mostrar menos durante la búsqueda
        filtered = true; // Marcar que se ha filtrado
    } else {
        document.getElementById('products').innerHTML = '';
        document.getElementById('noResultsMessage').style.display = 'block';
        document.getElementById('loadMoreBtn').style.display = 'none'; // Ocultar el botón de cargar más durante la búsqueda
    }
}


    // Inicializar el mapa de Google
    function initMap() {
            const location = { lat: -34.397, lng: 150.644 }; // Coordenadas de ejemplo
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: location,
            });
            const marker = new google.maps.Marker({
                position: location,
                map: map,
            });
        }


        const sizesByCategory = {
    "Camisas": ["S", "M", "L", "XL"],
    "Pantalones": ["28", "30", "32", "34", "36"],
    "Chaquetas": ["S", "M", "L", "XL"],
    "Suéteres": ["S", "M", "L", "XL"],
    "Accesorios": ["Único"],
    "Calzado": ["40", "42", "44"],
    "Vestidos": ["S", "M"],
    "Blusas": ["M", "L"],
    "Abrigos": ["L", "XL"],
    "Camisetas": ["S", "M", "L"],
    "Faldas": ["M", "L"],
    "Sudaderas": ["M", "L", "XL"],
    "Bermudas": ["M", "L"],
    "Polos": ["S", "M", "L"]
};

// Función para actualizar las opciones de talla según la categoría seleccionada
function updateSizeFilter() {
    const selectedCategory = categorySelect.value;

    // Limpiar las opciones de tallas
    sizeSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccionar Talla';
    sizeSelect.appendChild(defaultOption);

    // Si hay tallas disponibles para la categoría seleccionada, agregarlas
    if (selectedCategory && sizes[selectedCategory]) {
        sizes[selectedCategory].forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });
    }
}

    document.addEventListener("DOMContentLoaded", () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        displayProducts(products.slice(start, end)); // Mostrar productos de la página actual
        document.getElementById('loading').style.display = 'none';
       
    AOS.init({  // Inicializar las animaciones de AOS
        duration: 800, // Ajusta la duración de las animaciones
        offset: 200, // Ajusta el desplazamiento de las animaciones
       // once: true // Anima los elementos solo una vez
    });

            // Cargar el mapa de Google
            initMap();

            // Llamada para actualizar filtro de tallas y productos al cambiar la categoría
    document.getElementById('categoryFilter').addEventListener('change', () => {
        updateSizeFilter();
        filterProducts();
    });
    });
