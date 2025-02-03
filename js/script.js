

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
                <div class="card product-card" data-aos="fade-up" data-bs-toggle="modal" data-bs-target="#productModal" onclick="openProductModal(${product.id})">
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
                // Espera a que todas las imágenes y elementos estén cargados
        // Espera a que todas las imágenes y elementos estén cargados
        window.onload = function () {
            // Ocultar el preloader
            document.body.classList.add("loaded");

            // Inicializar AOS.js después de que la página esté lista
            AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true
            });
        };
            // Cargar el mapa de Google
            initMap();

            // Llamada para actualizar filtro de tallas y productos al cambiar la categoría
    document.getElementById('categoryFilter').addEventListener('change', () => {
        updateSizeFilter();
        filterProducts();
    });
    // Ocultar el carrito al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        const cartContainer = document.getElementById('cartContainer');
        const viewCartBtn = document.getElementById('viewCartBtn');
        if (!cartContainer.contains(event.target) && !viewCartBtn.contains(event.target)) {
            hideCart();
        }
    });
    });


    // Variables globales
let cart = [];
let currentProduct = {};

// Función para abrir el modal con detalles del producto
function openProductModal(productId) {
  currentProduct = products.find((p) => p.id === productId);
  document.getElementById('modalProductImg').src = currentProduct.image;
  document.getElementById('modalProductDescription').innerText =
    currentProduct.description;
  const sizesContainer = document.getElementById('modalProductSizes');
  sizesContainer.innerHTML = '';
  currentProduct.sizes.forEach((size) => {
    const sizeOption = document.createElement('span');
    sizeOption.classList.add('size-option');
    sizeOption.innerText = size;
    sizeOption.onclick = () => sizeOption.classList.toggle('selected');
    sizesContainer.appendChild(sizeOption);
  });
}

// Función para agregar el producto al carrito
// Función para agregar el producto al carrito
function addToCart() {
  console.log('Función addToCart llamada');

  const selectedSize = document.querySelector('.size-option.selected');
  if (!selectedSize) {
      console.log('No se seleccionó ninguna talla');
      alert('Por favor, selecciona una talla.');
      return;
  }
  
  console.log('Talla seleccionada:', selectedSize.innerText);

  const product = { ...currentProduct, size: selectedSize.innerText, quantity: 1 };
  console.log('Producto a agregar:', product);

  const cartIndex = cart.findIndex((item) => item.id === product.id && item.size === product.size);

  if (cartIndex > -1) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      console.log('El producto ya está en el carrito, incrementando cantidad');
      cart[cartIndex].quantity++;
  } else {
      console.log('El producto no está en el carrito, agregando');
      cart.push(product);
  }

  updateCart();
  showCart(); // Mostrar el carrito
  document.getElementById('viewCartBtn').style.display = 'block'; // Mostrar el botón flotante
}


// Función para actualizar el carrito
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let totalQuantity = 0;

  cart.forEach((item) => {
      totalQuantity += item.quantity;
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          ${item.title} - ${item.size} - ${item.price}
          <div class="quantity-control">
              <button onclick="decreaseQuantity(${item.id}, '${item.size}')">-</button>
              <span>${item.quantity}</span>
              <button onclick="increaseQuantity(${item.id}, '${item.size}')">+</button>
              <button onclick="removeFromCart(${item.id}, '${item.size}')">X</button>
          </div>
      `;
      cartItems.appendChild(listItem);
  });

  const total = cart.reduce((acc, item) => {
      return acc + parseFloat(item.price.replace('$', '')) * item.quantity;
  }, 0);

  document.getElementById('cartTotal').innerText = `$${total.toFixed(2)}`;
  document.getElementById('cartCountNav').innerText = totalQuantity;
  document.getElementById('cartCountBtn').innerText = totalQuantity;

  // Actualiza el enlace de WhatsApp con el nuevo pedido
  updateWhatsAppLink();
}


// Función para disminuir la cantidad de un producto
function decreaseQuantity(productId) {
  const product = cart.find((item) => item.id === productId);
  if (product.quantity > 1) {
    product.quantity--;
  } else {
    removeFromCart(productId);
  }
  updateCart();
}

// Función para aumentar la cantidad de un producto
function increaseQuantity(productId) {
  const product = cart.find((item) => item.id === productId);
  product.quantity++;
  updateCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
  if (cart.length === 0) {
    hideCart();
    document.getElementById('viewCartBtn').style.display = 'none';
  }
}

// Función para mostrar el carrito
let closeCartTimeout;

function showCart() {
    console.log("showCart se ha llamado");
    const cartContainer = document.getElementById('cartContainer');
    if (cartContainer) {
        cartContainer.classList.add('active');
        console.log("Clase 'active' añadida al contenedor del carrito");
        adjustButtonPositions('open');
        
        // Programar el cierre del carrito después de 5 segundos
        if (closeCartTimeout) {
            clearTimeout(closeCartTimeout); // Limpiar cualquier timeout anterior
        }
        closeCartTimeout = setTimeout(() => {
            hideCart();
            console.log("El carrito se cerró automáticamente después de 5 segundos");
        }, 5000);
    } else {
        console.error('No se encontró el elemento con id "cartContainer"');
    }
}


// Función para ocultar el carrito
function hideCart() {
  const cartContainer = document.getElementById('cartContainer');
  cartContainer.classList.remove('active');
  setTimeout(() => {
  }, 300); // 300ms coincide con la animación en CSS
  adjustButtonPositions('close');
}


// Función para alternar visibilidad del carrito
function toggleCart() {
  const cartContainer = document.getElementById('cartContainer');
  if (cartContainer.classList.contains('active')) {
    hideCart();
  } else {
    showCart();
  }
}

function adjustButtonPositions(state) {
  const cartButton = document.getElementById('viewCartBtn');
  const whatsappButton = document.querySelector('.whatsapp-float');
  
  if (cartButton && whatsappButton) {
      if (state === 'open') {
          console.log('Ajustando botones al abrir el carrito');
          cartButton.style.right = '390px'; // Ajusta este valor según sea necesario
          whatsappButton.style.right = '330px'; // Ajusta este valor según sea necesario
      } else {
          console.log('Ajustando botones al cerrar el carrito');
          cartButton.style.right = '80px';
          whatsappButton.style.right = '20px';
      }
  } else {
      console.error('No se encontraron los botones con id "viewCartBtn" y clase "whatsapp-float"');
  }
}





// Función para realizar el checkout
function checkout() {
   // Abre el modal
   const previewModal = new bootstrap.Modal(document.getElementById('previewOrderModal'));
   previewModal.show();
}

// Event listener para inicializar las funciones
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('categoryFilter').addEventListener('change', () => {
    updateSizeFilter();
    filterProducts();
  });
 

// Detener la propagación del evento de clic dentro del carrito y reiniciar el timeout
const cartContainer = document.getElementById('cartContainer');
cartContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Clic dentro del carrito detectado, reiniciando timeout');
    if (closeCartTimeout) {
        clearTimeout(closeCartTimeout); // Limpiar el timeout existente
    }
    // Programar el cierre del carrito después de 5 segundos desde el último clic
    closeCartTimeout = setTimeout(() => {
        hideCart();
        console.log("El carrito se cerró automáticamente después de 5 segundos");
    }, 5000);
});


// Ocultar el carrito al hacer clic fuera de él
document.addEventListener('click', (event) => {
  const cartContainer = document.getElementById('cartContainer');
  const viewCartBtn = document.getElementById('viewCartBtn');
  const productModal = document.getElementById('productModal'); // Si tienes un modal para productos
  const navShow = document.getElementById('navShow'); 

  console.log('Evento de clic detectado'); // Para verificar que el evento se detecta

  // Condición para evitar ocultar el carrito inmediatamente al abrirlo
  if (cartContainer.classList.contains('active')) {
      console.log('El carrito está activo');
      if (
          !cartContainer.contains(event.target) &&
          !viewCartBtn.contains(event.target) &&
          (!productModal || !productModal.contains(event.target)) &&
          (!navShow || !navShow.contains(event.target))
      ) {
          console.log('El clic fue fuera del carrito, botones y modal');
          hideCart();
      } else {
          console.log('El clic fue dentro del carrito, botones o modal');
      }
  }
});


});


function updateWhatsAppLink() {
  const whatsappButton = document.querySelector('.whatsapp-float');

  if (!whatsappButton || cart.length === 0) {
      console.error("No se encontraron productos en el carrito o el botón de WhatsApp.");
      return;
  }

  let orderDetails = "🛍️ *Resumen de mi pedido:*\n\n";
  let total = 0;

  cart.forEach(item => {
      const price = parseFloat(item.price.replace('$', ''));
      const subtotal = price * item.quantity;
      total += subtotal;

      orderDetails += `📌 *${item.title}*\n`;
      orderDetails += `   - Talla: ${item.size}\n`;
      orderDetails += `   - Cantidad: ${item.quantity}\n`;
      orderDetails += `   - Precio: $${price.toFixed(2)} c/u\n`;
      orderDetails += `   - Subtotal: $${subtotal.toFixed(2)}\n\n`;
  });

  orderDetails += `💰 *Total a pagar: $${total.toFixed(2)}*\n`;
  orderDetails += `🚚 *Método de entrega: A coordinar*`;

  // Muestra el resumen de la orden en el modal de vista previa
  document.getElementById('orderDetails').innerText = orderDetails;
  document.getElementById('orderTotal').innerText = `💰 Total: $${total.toFixed(2)}`;


  // Prepara el enlace de WhatsApp
  const phoneNumber = "584124160489"; // Número de WhatsApp al que se enviará el mensaje
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(orderDetails)}`;
  
  // Guarda el enlace de WhatsApp en el botón
  whatsappButton.href = whatsappLink;
}

function confirmOrder() {
  // Al confirmar, redirige al enlace de WhatsApp
  const whatsappButton = document.querySelector('.whatsapp-float');
  window.location.href = whatsappButton.href;
}


