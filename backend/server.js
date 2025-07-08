const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());

const products = JSON.parse(fs.readFileSync("products.json", "utf8"));

async function getGoldPrice() {
  const goldPricePerOunce = 1890;
  return goldPricePerOunce / 31.1035; 
}

app.get("/products", async (req, res) => {

  const goldPrice = await getGoldPrice();

  let enrichedProducts = products.map((product) => {
    const numericPrice = (product.popularityScore + 1) * product.weight * goldPrice;
    const numericPopularity = product.popularityScore * 5;

    return {
      ...product,
      price: numericPrice.toFixed(2),
      popularity: numericPopularity.toFixed(1),
      numericPrice,
      numericPopularity,
    };
  });

  const minPrice = parseFloat(req.query.minPrice);
  const maxPrice = parseFloat(req.query.maxPrice);
  const minPopularity = parseFloat(req.query.minPopularity);
  const maxPopularity = parseFloat(req.query.maxPopularity);

  if (!isNaN(minPrice)) {
    enrichedProducts = enrichedProducts.filter(p => p.numericPrice >= minPrice);
  }
  if (!isNaN(maxPrice)) {
    enrichedProducts = enrichedProducts.filter(p => p.numericPrice <= maxPrice);
  }
  if (!isNaN(minPopularity)) {
    enrichedProducts = enrichedProducts.filter(p => p.numericPopularity >= minPopularity);
  }
  if (!isNaN(maxPopularity)) {
    enrichedProducts = enrichedProducts.filter(p => p.numericPopularity <= maxPopularity);
  }

  const finalProducts = enrichedProducts.map(({ numericPrice, numericPopularity, ...rest }) => rest);

  res.json(finalProducts);
});

app.listen(PORT, () => {
  console.log(`Backend: http://localhost:${PORT}`);
});
