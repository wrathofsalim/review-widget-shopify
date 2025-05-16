import React from "react";
import { createRoot } from "react-dom/client";
import ReviewWidget from "./components/ReviewWidget";
import "./styles.css";

const container = document.getElementById("root");
const productId = document.getElementById("shopify-product-id").innerText.trim();

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ReviewWidget productId={productId} />
  </React.StrictMode>
);