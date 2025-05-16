import React from "react";
import { HashRouter as Router, Routes, Route, useParams } from "react-router-dom";
import ProductPage from "./pages/ProductPage";  
import "./App.css";  
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Our Store</h1>
        </header>
        <Routes>
          <Route path="/product/:productId" element={<ProductPageWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

const ProductPageWrapper = () => {
  const { productId } = useParams();
  return <ProductPage productId={productId} />;
};

export default App;