// 定义全局变量
let currentPage = 1;
const itemsPerPage = 20;

// 从静态数据文件加载产品信息并渲染到页面
function renderProducts(page) {
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
      // 计算当前页的起始索引和结束索引
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      // 遍历当前页的产品数据并渲染到页面上
      for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
          <img src="${product.image}" alt="暂无图片">
          <h3>${product.name}</h3>
          <p>价格: ¥${product.price}</p>
          <p>${product.description}</p>
          <a href="products.html?id=${product.id}">查看详情</a>
        `;
        productList.appendChild(productItem);
      }

      // 渲染分页按钮
      renderPagination(products.length);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

// 渲染分页按钮
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  // 创建并添加分页按钮
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('span');
    button.classList.add('pagination-button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      renderProducts(currentPage);
    });
    pagination.appendChild(button);
  }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(currentPage);
});
