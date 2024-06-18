// 从 URL 中获取产品 ID
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// 从静态数据文件加载产品信息并渲染到页面
fetch('data/products.json')
  .then(response => response.json())
  .then(products => {
    const product = products.find(product => product.id == productId);
    if (product) {
      renderProductDetails(product);
    } else {
      console.error('Product not found');
    }
  })
  .catch(error => {
    console.error('Error fetching product:', error);
  });

// 渲染产品详情信息
function renderProductDetails(product) {
  const productDetails = document.getElementById('product-details');
  productDetails.innerHTML = `
    <h2>${product.name}</h2>
    <img src="img/${product.image}" alt="${product.name}">
    <p>价格: ¥${product.price}</p>
    <p>描述: ${product.description}</p>
    <button id="add-to-cart">加入购物车</button>
  `;

  // 添加到购物车事件
  const addToCartButton = document.getElementById('add-to-cart');
  addToCartButton.addEventListener('click', () => {
    addToCart(product);
    // 跳转到购物车页面
    window.location.href = `cart.html?id=${product.id}`;
  });
}

// 添加商品到购物车
function addToCart(product) {
  let cartItems = localStorage.getItem('cartItems');

  if (!cartItems) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(cartItems);
  }

  cartItems.push(product);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
