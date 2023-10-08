import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAdsRequest, getAds } from '../../../redux/adsRedux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './SearchAds.module.scss';

const SearchAds = () => {
  const [filteredAds, setFilteredAds] = useState([]);
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ads = useSelector(getAds);

  // Funkcja do filtrowania ogłoszeń
  const filterAds = () => {
    const filtered = ads.filter((ad) =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAds(filtered);
  };

  useEffect(() => {
    // Ładujemy ogłoszenia po raz pierwszy
    dispatch(loadAdsRequest());
  }, [dispatch]);

  useEffect(() => {
    // Filtrujemy ogłoszenia po załadowaniu
    filterAds();
  }, [ads, searchTerm]); // Zależność od ads i searchTerm, aby wywołać efekt po załadowaniu ogłoszeń i zmianie searchTerm

  const handleDetailsClick = (adId) => {
    // Navigacja do szczegółów ogłoszenia
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
