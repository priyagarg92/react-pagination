import React, { useState, useEffect } from 'react';
import Post from './Post';
import Search from './Search';
import Pagination from './Pagination';
import ErrorBoundaryComponent from './ErrorBoundary';
import useFetch from './useFetch';
import './style.css';

export default function App() {
  const [searchParam, setSearchParam] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  const { data, isLoading, errorMessage } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = data && data.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPosts = () => {
    const filteredData = data.filter((post) => {
      return Object.values(post)
        .join('')
        .toLowerCase()
        .includes(searchParam.toLowerCase());
    });
    setFilteredResults(filteredData);
    // currentPosts =
    //   filteredResults &&
    //   filteredResults.slice(indexOfFirstPost, indexOfLastPost);
  };

  const handleChange = (e) => {
    setSearchParam(e.target.value);

    if (searchParam !== '') {
      filteredPosts();
    } else {
      setFilteredResults(data);
    }
  };

  return (
    <ErrorBoundaryComponent>
      <Search searchParam={searchParam} handleChange={handleChange} />

      {isLoading && <p>Please wait while we're fetching details for you...</p>}
      {errorMessage && <p>Error occured while fetching posts...</p>}

      <div className="display-grid">
        {searchParam.length > 0 ? (
          filteredResults.length == 0 ? (
            <div className="notFound">No results found!</div>
          ) : (
            <Post posts={filteredResults} />
          )
        ) : (
          <Post posts={currentPosts} />
        )}
      </div>

      <Pagination
        // length={searchParam !== '' ? filteredResults?.lenght : data?.length}
        length={data?.length}
        postsPerPage={postsPerPage}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </ErrorBoundaryComponent>
  );
}
