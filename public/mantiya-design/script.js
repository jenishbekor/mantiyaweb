const cart = [];

function getElement(id) {
  return document.getElementById(id);
}

function openCart() {
  const cartPanel = getElement('cartPanel');
  const overlay = getElement('overlay');
  if (!cartPanel || !overlay) return;
  cartPanel.classList.add('open');
  cartPanel.setAttribute('aria-hidden', 'false');
  overlay.classList.add('show');
}

function closePanels() {
  const cartPanel = getElement('cartPanel');
  const overlay = getElement('overlay');
  const loginModal = getElement('loginModal');
  if (cartPanel) {
    cartPanel.classList.remove('open');
    cartPanel.setAttribute('aria-hidden', 'true');
  }
  if (overlay) overlay.classList.remove('show');
  if (loginModal) loginModal.classList.remove('show');
}

function renderCart() {
  const cartCount = getElement('cartCount');
  const cartItems = getElement('cartItems');
  const cartTotal = getElement('cartTotal');
  if (!cartCount || !cartItems || !cartTotal) return;

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = total.toLocaleString('en-US') + ' сом';

  if (!cart.length) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong><br>
        <span>${item.qty} × ${item.price.toLocaleString('en-US')} сом</span>
      </div>
      <button type="button" data-remove="${index}" aria-label="Remove ${item.name}">Remove</button>
    </div>
  `).join('');
}

function filterProducts() {
  const searchInput = getElement('searchInput');
  const emptyState = getElement('emptyState');
  if (!searchInput || !emptyState) return;

  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = document.querySelector('.category-chip.selected');
  const category = selectedCategory ? selectedCategory.dataset.category : 'All';

  let visible = 0;
  document.querySelectorAll('.product-card').forEach((card) => {
    const matchesText = card.dataset.name.toLowerCase().includes(query);
    const matchesCategory = category === 'All' || card.dataset.category === category;
    const shouldShow = matchesText && matchesCategory;
    card.hidden = !shouldShow;
    if (shouldShow) visible += 1;
  });

  emptyState.hidden = visible !== 0;
}

const menuToggle = getElement('menuToggle');
const mainNav = getElement('mainNav');
const cartToggle = getElement('cartToggle');
const closeCart = getElement('closeCart');
const overlay = getElement('overlay');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (cartToggle) cartToggle.addEventListener('click', openCart);
if (closeCart) closeCart.addEventListener('click', closePanels);
if (overlay) overlay.addEventListener('click', closePanels);

const cartItems = getElement('cartItems');
if (cartItems) {
  cartItems.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove]');
    if (!removeButton) return;
    cart.splice(Number(removeButton.dataset.remove), 1);
    renderCart();
  });
}

document.querySelectorAll('.add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.dataset.product;
    const price = Number(button.dataset.price);
    const existing = cart.find((item) => item.name === name);

    if (existing) existing.qty += 1;
    else cart.push({ name, price, qty: 1 });

    renderCart();
    openCart();
  });
});

document.querySelectorAll('.heart').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('liked');
    button.textContent = button.classList.contains('liked') ? '♥' : '♡';
  });
});

document.querySelectorAll('.category-chip').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category-chip').forEach((chip) => chip.classList.remove('selected'));
    button.classList.add('selected');
    filterProducts();
  });
});

const searchInput = getElement('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', filterProducts);
}

const loginBtn = getElement('loginBtn');
const loginModal = getElement('loginModal');
const closeLogin = getElement('closeLogin');
const loginForm = getElement('loginForm');

if (loginBtn && loginModal) {
  loginBtn.addEventListener('click', () => {
    loginModal.classList.add('show');
    if (overlay) overlay.classList.add('show');
  });
}

if (closeLogin) closeLogin.addEventListener('click', closePanels);

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Login form demo: connect this form to your authentication backend.');
    event.target.reset();
    closePanels();
  });
}

const subscribeForm = getElement('subscribeForm');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for subscribing!');
    event.target.reset();
  });
}

const contactForm = getElement('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks for reaching out. We will get back to you shortly.');
    event.target.reset();
  });
}

renderCart();
