import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const Sidebar = ({ categories, handleCategoryClick, handleSearch }) => { 
  const [searchQuery, setSearchQuery] = useState('');                    

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="sidebar">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/category/${category}`} onClick={() => handleCategoryClick(category)}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search images..."
        />
        <button onClick={() => handleSearch(searchQuery)}>Search</button>
      </div>
    </div>
  );
};

const ImageGallery = ({ category }) => {
  const [images, setImages] = useState([]);
  const [imagesFetched, setImagesFetched] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${category}&per_page=15`,
        {
          headers: {
            Authorization: 'Client-ID mDiq-NR0vedoTdnJ58vfOxFIQ-dfKSXrJko8_QzPYII',
          },
        }
      );
      const data = await response.json();
      setImages(data.results);
      setImagesFetched(true);
    };

    fetchImages();
  }, [category]);

  if (!imagesFetched) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="heading-container">
        <h2>DISPLAYING: {category}</h2>
      </div>
      <div className="image-gallery">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      <Link to={`/image/${image.id}`}>
        <img src={image.urls.small} alt={image.alt_description} width={200} height={200} />
      </Link>
    </div>
  );
};

const ImageInfo = ({ image }) => {
  return (
    <div className="image-info">
      <h3>{image?.description || 'No Description'}</h3>
      <p>Author: {image?.user?.name || 'Unknown'}</p>
    </div>
  );
};

const ImagePage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(`https://api.unsplash.com/photos/${id}`, {
        headers: {
          Authorization: 'Client-ID zaHU4eyefSkdUed5pdkdW_teA_sPYvO0JhJsN6Ve6wQ',
        },
      });
      const data = await response.json();
      setImage(data);
    };

    fetchImage();
  }, [id]);

  return (
    <div className="image-page">
      {image ? <ImageInfo image={image} /> : <p>Loading...</p>}
    </div>
  );
};

const App = () => {
  const categories = ['DOG', 'CAT', 'COW', 'HUMAN', 'SEA', 'AQUATIC', 'GALAXY', 'GOD', 'SHIVA', 'BANGALORE'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSelectedCategory(query);
  };

  return (
    <Router>
      <div className="app">
        <h1 className="header">IMA-GEN UNDER A CLICK</h1>
        <div className="container">
          <Sidebar categories={categories} handleCategoryClick={handleCategoryClick} handleSearch={handleSearch} />
          <Routes>
            <Route path="/category/:category" element={<ImageGallery category={selectedCategory} />} />
            <Route path="/image/:id" element={<ImagePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
