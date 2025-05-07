import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config'

// Remove the `data` prop - we won't use that anymore
const CardList = () => {
  // define the limit state variable and set it to 10
  const limit = 10;

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  
  // Define the products state variable with empty array as initial state
  const [products, setProducts] = useState([]);

  // Create a function to fetch the products with pagination
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  // Use the useEffect hook to fetch the products when the component boots or when offset changes
  useEffect(() => {
    fetchProducts();
  }, [offset]);

  // Handle previous button click
  const handlePrevious = () => {
    // Ensure we don't go below 0
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  // Handle next button click
  const handleNext = () => {
    setOffset(offset + limit);
  };

  const filterTags = (tagQuery) => {
    // Reset pagination when filtering
    setOffset(0);
    
    // If a tag query is provided, append it to the API request
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}&tag=${tagQuery || ''}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }
}

export default CardList;