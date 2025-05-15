import React, { useEffect, useState } from "react";
import ReviewWidget from "./ReviewWidget";

const ProductPage = () => {
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    // Extract product ID from Shopify Liquid template
    const shopifyProductId = document.getElementById("shopify-product-id")?.innerText;
    if (shopifyProductId) {
      setProductId(shopifyProductId);
    }
  }, []);

  return (
    <div className="product-page">
      <h1>Product Page</h1>
      <p>Product ID: {productId || "Loading..."}</p>

      {/* Reviews should appear here */}
      {productId && <ReviewWidget productId={productId} />}
    </div>
  );
};

export default ProductPage;