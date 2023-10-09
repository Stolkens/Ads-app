import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAds } from '../../../redux/adsRedux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './SearchAds.module.scss';

const SearchAds = () => {
  const [filteredAds, setFilteredAds] = useState([]);
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const ads = useSelector(getAds);

  const filterAds = () => {
    const filtered = ads.filter((ad) =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAds(filtered);
  };

  useEffect(() => {
    filterAds();
  }, []); 
  

  const handleDetailsClick = (adId) => {
    navigate(`/${adId}`);
  };
  return (
    <>
      <h2>Search Results for "{searchTerm}"</h2>
      <div className={`${styles.container} mt-3 mb-3`}>
        {filteredAds.map(ad =>
          <Card key={ad._id} className={styles.card} style={{ width: '20rem' }}>
            <Card.Img className={styles.image} variant="top" src={`http://localhost:8000/uploads/${ad.image}`} />
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>
                {ad.location}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => handleDetailsClick(ad._id)}
              >
                More details
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </>


  );
};

export default SearchAds;
