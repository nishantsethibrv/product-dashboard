import React, { useEffect, useState } from 'react';
import "./ProductList.css" // Import your CSS for styling
import { useNavigate } from 'react-router-dom'; // Import if using React Router for navigation
import EditProduct from './EditProduct';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize history for navigation
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditProduct, setshowEditProduct] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true); // Start loading before fetching
        try {
          const response = await fetch('https://dummyjson.com/products');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log(data)
          setProducts(data.products); // Adjust according to your API response structure
        } catch (err) {
          setError('Failed to fetch products');
        } finally {
          setLoading(false); // Stop loading regardless of success or error
        }
      };

    fetchProducts();
  }, []);

  const handleEditClick = async (productId) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const productDetails = await response.json();
      console.log(productDetails, "prod det")
      // Assuming you want to pass the product details to the Edit component
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
          {/* Hidden ID */}
          <span style={{ display: 'none' }}>{product.id}</span>
          {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} // Access the first image in the array
            alt={product.title} 
            className="product-image" 
          />
        ) : (
          <img 
            src="path_to_default_image.jpg" // Fallback image if no image exists
            alt="Default" 
            className="product-image" 
          />
        )}
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-price">Price: ${product.price}</p>
          {/* Add edit button or link if needed */}
        </div>
      ))}
    </div>}
    {showEditProduct && <EditProduct productData={selectedProduct} />}
    </>
  );
};

export default ProductsList;
