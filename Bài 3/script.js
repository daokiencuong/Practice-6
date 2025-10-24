const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');

searchBtn.addEventListener('click', () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const products = document.querySelectorAll('.product-item');

  products.forEach((product) => {
    const name = product
      .querySelector('.product-name')
      .textContent.toLowerCase();
    product.style.display = name.includes(keyword) ? '' : 'none';
  });
});

addProductBtn.addEventListener('click', () => {
  addProductForm.classList.toggle('hidden');
  if (!addProductForm.classList.contains('hidden')) {
    addProductForm.scrollIntoView({ behavior: 'smooth' });
  }
});

addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form này chỉ minh họa — sản phẩm chưa được thêm thật.');
});
