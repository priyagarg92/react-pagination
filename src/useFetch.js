import React, { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const jsonResponse = await response.json(); 
      setIsLoading(false);
      setData(jsonResponse);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(`${err} unable fetch data`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, errorMessage };
};

export default useFetch;
