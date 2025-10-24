const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtn = document.getElementById('filterBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');
const productList = document.getElementById('product-list');
const loadJsonBtn = document.getElementById('loadJsonBtn');

let products = [];

// === HÀM TẠO SẢN PHẨM ===
function createProductElement(p) {
  const el = document.createElement('article');
  el.className = 'product-item';
  el.innerHTML = `
    <img src="${
      p.img || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
    }" alt="Book Cover" />
    <h3 class="product-name">${p.name}</h3>
    <p>${p.desc || 'Không có mô tả.'}</p>
    <p class="product-price">${p.price} vnđ</p>
  `;
  return el;
}

// === HIỂN THỊ DANH SÁCH ===
function renderProducts(list) {
  productList.innerHTML = '';
  list.forEach((p) => productList.appendChild(createProductElement(p)));
}

// === LƯU / TẢI LOCALSTORAGE ===
function saveProducts() {
  localStorage.setItem('chs_products', JSON.stringify(products));
}

function loadProducts() {
  const data = localStorage.getItem('chs_products');
  products = data ? JSON.parse(data) : [];
}

// === LỌC TÊN ===
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(keyword),
  );
  renderProducts(filtered);
});

// === LỌC GIÁ ===
filterBtn.addEventListener('click', () => {
  const min = parseFloat(document.getElementById('minPrice').value) || 0;
  const max = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  const filtered = products.filter((p) => {
    const price = parseFloat(p.price.replace(/\D/g, ''));
    return price >= min && price <= max;
  });
  renderProducts(filtered);
});

// === ẨN / HIỆN FORM ===
addProductBtn.addEventListener('click', () => {
  addProductForm.classList.toggle('hidden');
  if (!addProductForm.classList.contains('hidden')) {
    addProductForm.scrollIntoView({ behavior: 'smooth' });
  }
});

cancelBtn.addEventListener('click', () => {
  addProductForm.classList.add('hidden');
  addProductForm.reset();
  errorMsg.textContent = '';
});

// === THÊM SẢN PHẨM MỚI ===
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('newName').value.trim();
  const price = document.getElementById('newPrice').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const img = document.getElementById('newImg').value.trim();

  if (!name || !price || isNaN(price) || price <= 0) {
    errorMsg.textContent = 'Nhập tên và giá hợp lệ!';
    return;
  }

  const newProduct = { name, price, desc, img };
  products.unshift(newProduct);
  saveProducts();
  renderProducts(products);

  addProductForm.reset();
  addProductForm.classList.add('hidden');
});

// === NẠP DỮ LIỆU TỪ JSON ===
loadJsonBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('products.json');
    const data = await res.json();
    products = [...data, ...products];
    saveProducts();
    renderProducts(products);
    alert('Đã nạp dữ liệu từ file JSON!');
  } catch {
    alert('Không thể tải dữ liệu JSON!');
  }
});

// === KHỞI ĐỘNG ===
loadProducts();
if (products.length === 0) {
  products = [
    {
      name: 'Sách giáo khoa toán 1',
      desc: 'Sách giáo khoa toán 1 theo tiêu chuẩn của Bộ Giáo Dục Việt Nam.',
      price: '90000',
      img: 'https://book.sachgiai.com/uploads/book/sach-giao-khoa-toan-1/sach-giao-khoa-toan-1-0.jpg',
    },
    {
      name: 'Cùng Trung học toán',
      desc: 'Sách ôn thi cùng thầy Trung.',
      price: '899000',
      img: 'https://thcs.toanmath.com/wp-content/uploads/2022/08/sach-giao-khoa-toan-9-tap-1.png',
    },
  ];
  saveProducts();
}
renderProducts(products);
