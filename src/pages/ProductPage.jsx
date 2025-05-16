import React, { useEffect, useState } from "react";
import ReviewWidget from "../components/ReviewWidget";
import "./ProductPage.css"; 

const ProductPage = () => {
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const shopifyProductId = document.getElementById("shopify-product-id")?.innerText;
    if (shopifyProductId) {
      setProductId(shopifyProductId);
    }
  }, []);

  return (
    <div className="product-page">
      <h1>Product Page</h1>
      <p>Product ID: {productId || "Loading..."}</p>

      {productId && <ReviewWidget productId={productId} />}
    </div>
  );
};

export default ProductPage;