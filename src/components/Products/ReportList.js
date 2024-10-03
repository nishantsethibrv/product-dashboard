import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportPage = () => {
    const [newProductsCount, setNewProductsCount] = useState(0);
    const [existingProductsCount, setExistingProductsCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchExistingProductsCount = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setExistingProductsCount(data.total);
            } catch (error) {
                console.error('Error fetching existing products:', error);
            }
        };

        const fetchNewProductsCount = () => {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            setNewProductsCount(products.length);
        };

        fetchExistingProductsCount();
        fetchNewProductsCount();
    }, []);

    return (
        <div className="report-page">
            <h1>Product Report</h1>
            <div className="cards">
                <div className="card" onClick={() => navigate('/view-new-products')}>
                    <h2>Latest Products Count</h2>
                    <p>{newProductsCount}</p>
                </div>

                <div className="card" onClick={() => navigate('/view-existing-products')}>
                    <h2>Existing Products Count</h2>
                    <p>{existingProductsCount}</p>
                </div>
            </div>
        </div>
    );
};

export default ReportPage;
