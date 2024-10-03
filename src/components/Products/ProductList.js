import React, { useEffect, useState } from 'react';
import "./ProductList.css"
import { useNavigate } from 'react-router-dom';
import EditProduct from './EditProduct';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditProduct, setshowEditProduct] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await fetch('https://dummyjson.com/products');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)
          setProducts(data.products);
        } catch (err) {
          setError('Failed to fetch products');
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, []);

  const handleEditClick = async (productId) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const productDetails = await response.json();
      console.log(productDetails, "prod det")
      // navigate(`/edit-product/${productId}`, { state: { product: productDetails } });
      setSelectedProduct(productDetails);
      setshowEditProduct(true)
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    {!showEditProduct && 
    <div className="products-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id} onClick={() => handleEditClick(product.id)}>
          <span style={{ display: 'none' }}>{product.id}</span>
          {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]}
            alt={product.title} 
            className="product-image" 
          />
        ) : (
          <img 
            src="path_to_default_image.jpg"
            alt="Default" 
            className="product-image" 
          />
        )}
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-price">Price: ${product.price}</p>
        </div>
      ))}
    </div>}
    {showEditProduct && <EditProduct productData={selectedProduct} />}
    </>
  );
};

export default ProductsList;
