// 从 localStorage 中加载购物车信息并渲染到页面
document.addEventListener('DOMContentLoaded', function () {
  renderCartItems();
});

// 渲染购物车中的产品列表
function renderCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartContainer = document.getElementById('cart-items');
  let totalPrice = 0;  
  if(Array.isArray(cartItems) && cartItems.length > 0) {
    cartContainer.innerHTML = ''; // 清空购物车列表
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="暂无图片">
        <h3>${item.name}</h3>
        <p>价格: $${item.price}</p>
        <p>描述: $${item.description}</p>
        <button onclick="removeItem(${item.id})">删除</button>
      `;
      // 数量
      // <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></input>
      cartContainer.appendChild(cartItem);
  
      totalPrice += Number(item.price);
      // totalPrice += item.price * item.quantity;
  
    });
  } else {
    cartContainer.innerHTML = `<h3 style="text-align:center;color:#ccc;">暂无数据</h3>`; // 清空购物车列表
  }
  document.getElementById('total-price').textContent = `总价: ¥${totalPrice.toFixed(2)}`;
}

// 更新购物车中商品的数量
// function updateQuantity(itemId, newQuantity) {
//   let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//   cartItems = cartItems.map(item => {
//     if (item.id === itemId) {
//       item.quantity = parseInt(newQuantity);
//     }
//     return item;
//   });

//   localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   renderCartItems();
// }

// 从购物车中删除指定产品
function removeItem(itemId) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  cartItems = cartItems.filter(item => item.id !== itemId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  renderCartItems();
}

// 清空购物车
document.getElementById('clear-cart').addEventListener('click', () => {
  localStorage.removeItem('cartItems');
  renderCartItems();
});

// 结算
document.getElementById('checkout').addEventListener('click', () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  if(Array.isArray(cartItems) && cartItems.length > 0) {
    showOrderConfirmation();
  }
});

// 弹出订单信息确认窗口
function showOrderConfirmation() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let confirmationMessage = '确认订单信息：\n';

  cartItems.forEach(item => {
    // confirmationMessage += `${item.name} x ${item.quantity}\n`;
    confirmationMessage += `${item.name}\n`;
  });
  console.log(calculateTotalPrice(), '-----')
  confirmationMessage += `\n总价: ¥${calculateTotalPrice().toFixed(2)}`;

  // 使用原生的 window.confirm 弹窗
  const isConfirmed = window.confirm(confirmationMessage);
  if (isConfirmed) {
    localStorage.removeItem('cartItems');
    renderCartItems();
    // 在这里可以添加处理订单的逻辑，例如跳转到支付页面等
    alert('结算成功，感谢您的购买！');
    location.href = "index.html"
  } else {
    // 用户取消了订单
    // alert('订单已取消。');
  }
}

// 计算购物车中商品的总价
function calculateTotalPrice() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let totalPrice = 0;
  cartItems.forEach(item => {
    // totalPrice += item.price * item.quantity;
    totalPrice += Number(Number(item.price).toFixed(2));
  });
  return totalPrice;
}
