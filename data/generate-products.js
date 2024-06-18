const fs = require('fs');

// 生成示例产品数据
const generateProducts = (count) => {
    const products = [];
    for (let i = 1; i <= count; i++) {
        const product = {
            id: i,
            name: `Product ${i}`,
            description: `This is a description for Product ${i}.`,
            price: getRandomPrice(4000, 20000), // 随机价格
            image: `../image/img1.avif`, // 示例图像链接
        };
        products.push(product);
    }
    return products;
};

// 生成指定范围内的随机价格
const getRandomPrice = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
};

// 生成示例产品数据并保存到 products.json 文件
const productCount = 100; // 想要生成的产品数量
const productsData = generateProducts(productCount);
fs.writeFileSync('products.json', JSON.stringify(productsData, null, 2));
