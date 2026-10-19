// PERSONALIZE AQUI: coloque seu número com código do país e DDD, só números.
// Exemplo fictício: 5511999999999. Não use o número abaixo como contato real.
const WHATSAPP_NUMBER = "5511993504204";

// Preços ilustrativos: atualize os valores e confirme disponibilidade antes de publicar.

const products = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    storage: "256 GB",
    color: "Titânio Preto",
    price: 9999,
    category: "pro",
    badge: "LINHA PRO",
    image: "images/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large_2x.jpg"
  },
  {
    id: 2,
    name: "iPhone 16 Pro",
    storage: "256 GB",
    color: "Titânio Natural",
    price: 8999,
    category: "pro",
    badge: "LINHA PRO",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/IPhone_16_Pro_%2854251926676%29.jpg"
  },
  {
    id: 3,
    name: "iPhone 16",
    storage: "128 GB",
    color: "Ultramarino",
    price: 6499,
    category: "normal",
    badge: "DESTAQUE",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4,
    name: "iPhone 16 Plus",
    storage: "128 GB",
    color: "Rosa",
    price: 7499,
    category: "normal",
    badge: "TELA AMPLA",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_16_Pro_(54252352825).jpg?width=700"
  }
];


const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const grid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
let activeFilter = "todos";

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderProducts() {
  const term = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const visible = products.filter(product => {
    const matchesFilter = activeFilter === "todos" || product.category === activeFilter;
    const matchesSearch = `${product.name} ${product.storage} ${product.color}`.toLocaleLowerCase("pt-BR").includes(term);
    return matchesFilter && matchesSearch;
  });

  if (!visible.length) {
    grid.innerHTML = '<p class="empty-state">Nenhum modelo encontrado. Tente outro termo.</p>';
    return;
  }

  grid.innerHTML = visible.map(product => {
    const message = `Olá! Tenho interesse no ${product.name}, ${product.storage}, cor ${product.color}. O preço anunciado é ${money(product.price)}. Pode confirmar disponibilidade, procedência, garantia e condições de pagamento?`;
    return `
      <article class="product-card">
        <div class="product-visual">
          <span class="product-badge">${product.badge}</span>
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('image-fallback')">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-spec">${product.storage} · ${product.color}</p>
          <p class="price">${money(product.price)}</p>
          <p class="installment">Consulte opções de pagamento</p>
          <a class="button button-green product-buy" href="${whatsappLink(message)}" target="_blank" rel="noopener">◉ Comprar pelo WhatsApp</a>
          <div class="shipping"><span>↗</span> Consulte entrega e disponibilidade</div>
        </div>
      </article>`;
  }).join("");
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

const generalMessage = "Olá! Vim pelo catálogo da iTech Store e gostaria de consultar os iPhones disponíveis.";
document.querySelector("#headerWhatsApp").href = whatsappLink(generalMessage);
document.querySelector("#footerWhatsApp").href = whatsappLink(generalMessage);

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
