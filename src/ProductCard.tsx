import { useEffect, useState } from "react";
import { Product } from "./types";
import "./App.css"

const ProductCard = () => {
    const [searchProduct, setSearchProduct] = useState<string>("");
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [productInfo, setProductInfo] = useState<Product[]>([]);
  
    useEffect(() => {
        const fetchProductData = async () => {
          try {
            const response = await fetch("/products.json");
            if (!response.ok) {
              throw new Error("Failed to fetch product data");
            }
            const data = await response.json();
            setProductInfo(data.products);
          } catch (err) {
            console.error("Error fetching product data:", err);
            setError("Failed to load product data.");
          }
        };
        fetchProductData();
      }, []);
      
  
    const handleSearch = () => {

      const isProductFound = productInfo.find((prod) =>
        prod.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
 
      if (isProductFound) {
        setProduct(isProductFound);
        setError(null);
      } else {
        setProduct(null);
        setError("No product found with the given name");
      }
    };
  
    return (
      <div className="product-card">
        <div className="search-section">
          <input
            type="text"
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
            placeholder="Enter product name..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="results-section">
          {error && <p className="error">{error}</p>}
          {product && (
            <div className="product-info">
              <img src={product.image} alt={product.name} />
              <p>Id: {product.id}</p>
              <p>Name: {product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ProductCard;