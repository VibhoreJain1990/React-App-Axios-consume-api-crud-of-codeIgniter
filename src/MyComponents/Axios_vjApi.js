import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosFakeApiCall = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts
    axios.get('https://fakestoreapi.com/products/1')
      .then((response) => {
        setProduct(response.data); // Set the fetched data to state
      })
      .catch((err) => {
        setError(err); // Handle errors by setting state
        console.error(err);
      });
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <img src={product.image} alt={product.title} height='300px' widht='300px'/>
    </div>
  );
};

export default AxiosFakeApiCall;
