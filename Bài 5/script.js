// ===== LẤY PHẦN TỬ =====
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');
const productList = document.getElementById('product-list');

// ===== HÀM TẠO PHẦN TỬ SẢN PHẨM =====
function createProductElement(product) {
  const item = document.createElement('article');
  item.className = 'product-item';
  item.innerHTML = `
    <img src="${
      product.img ||
      'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
    }" alt="Book Cover" />
    <h3 class="product-name">${product.name}</h3>
    <p>${product.desc || 'Không có mô tả.'}</p>
    <p class="product-price">${product.price} vnđ</p>
  `;
  return item;
}

// ===== LẤY DANH SÁCH TỪ LOCALSTORAGE =====
function loadProducts() {
  const data = localStorage.getItem('chs_products');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// ===== LƯU DANH SÁCH VÀO LOCALSTORAGE =====
function saveProducts(products) {
  localStorage.setItem('chs_products', JSON.stringify(products));
}

// ===== HIỂN THỊ DANH SÁCH SẢN PHẨM =====
function renderProducts(products) {
  productList.innerHTML = '';
  products.forEach((p) => productList.appendChild(createProductElement(p)));
}

// ===== KHỞI TẠO DỮ LIỆU MẶC ĐỊNH =====
const defaultProducts = [
  {
    name: 'Sách giáo khoa toán 1',
    desc: 'Sách giáo khoa toán 1 theo tiêu chuẩn của Bộ Giáo Dục Việt Nam.',
    price: '90.000',
    img: 'https://book.sachgiai.com/uploads/book/sach-giao-khoa-toan-1/sach-giao-khoa-toan-1-0.jpg',
  },
  {
    name: 'Cùng Trung học toán',
    desc: 'Sách ôn thi cùng thầy Trung.',
    price: '899.000',
    img: 'https://thcs.toanmath.com/wp-content/uploads/2022/08/sach-giao-khoa-toan-9-tap-1.png',
  },
  {
    name: 'Toán 4',
    desc: 'Sách giáo khoa toán lớp 4.',
    price: '100.000',
    img: 'https://lh3.googleusercontent.com/proxy/OPz33vHwc65ZhU86Qc5fu63MCwBqrVTFWeWGHHrIQcruAqES5mP5Ntb63PVwN805bzdk72SSnEnB5o4zOQFm3wNAzLTT_QREMv87RNH7uA',
  },
];

// ===== KHỞI TẠO =====
let products = loadProducts();
if (products.length === 0) {
  products = defaultProducts;
  saveProducts(products);
}
renderProducts(products);

// ===== TÌM KIẾM SẢN PHẨM =====
searchBtn.addEventListener('click', () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const items = document.querySelectorAll('.product-item');

  items.forEach((item) => {
    const name = item.querySelector('.product-name').textContent.toLowerCase();
    item.style.display = name.includes(keyword) ? '' : 'none';
  });
});

// ===== ẨN / HIỆN FORM =====
addProductBtn.addEventListener('click', () => {
  addProductForm.classList.toggle('hidden');
  if (!addProductForm.classList.contains('hidden')) {
    addProductForm.scrollIntoView({ behavior: 'smooth' });
  }
});

// ===== NÚT HỦY =====
cancelBtn.addEventListener('click', () => {
  addProductForm.classList.add('hidden');
  addProductForm.reset();
  errorMsg.textContent = '';
});

// ===== XỬ LÝ SUBMIT FORM =====
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('newName').value.trim();
  const price = document.getElementById('newPrice').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const imgSrc = document.getElementById('newImg').value.trim();

  // Kiểm tra hợp lệ
  if (!name || !price || isNaN(price) || price <= 0) {
    errorMsg.textContent = '⚠️ Vui lòng nhập tên và giá hợp lệ!';
    return;
  }

  errorMsg.textContent = '';

  // Tạo sản phẩm mới
  const newProduct = {
    name,
    desc,
    price,
    img: imgSrc || 'https://via.placeholder.com/150?text=No+Image',
  };

  // Thêm vào danh sách và lưu
  products.unshift(newProduct);
  saveProducts(products);

  // Cập nhật hiển thị
  renderProducts(products);

  // Reset form và ẩn
  addProductForm.reset();
  addProductForm.classList.add('hidden');
  productList.scrollIntoView({ behavior: 'smooth' });
});
