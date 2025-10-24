// ===== LẤY PHẦN TỬ =====
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');
const productList = document.getElementById('product-list');

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

// Nút Hủy
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
  const newItem = document.createElement('article');
  newItem.className = 'product-item';
  newItem.innerHTML = `
    <img src="${
      imgSrc ||
      'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
    }" alt="Book Cover" />
    <h3 class="product-name">${name}</h3>
    <p>${desc || 'Không có mô tả.'}</p>
    <p class="product-price">${price} vnđ</p>
  `;

  // Thêm vào danh sách
  productList.prepend(newItem);

  // Reset form & ẩn đi
  addProductForm.reset();
  addProductForm.classList.add('hidden');

  // Cuộn đến đầu danh sách
  productList.scrollIntoView({ behavior: 'smooth' });
});
