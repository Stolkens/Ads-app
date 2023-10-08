import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './GeneratedAds.module.scss';
import { Link } from "react-router-dom";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const GeneratedAds = () => {

  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(loadAdsRequest())
  }, [dispatch]);

  return (
    <div>
      <InputGroup className="mb-3" style={{ width: '300px' }}>
        <Form.Control
          type="text"
          placeholder="Search ads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to={`/search/${searchTerm}`}>
          <Button variant="outline-secondary">
            Search
          </Button>
        </Link>

      </InputGroup>
      <div className={`${styles.container} mt-3 mb-3`}>

        {ads.map(ad =>
          <Card key={ad._id} className={styles.card} style={{ width: '20rem' }}>
            <Card.Img className={styles.image} variant="top" src={`http://localhost:8000/uploads/${ad.image}`} />
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>
                {ad.location}
              </Card.Text>
              <Link to={ad._id}><Button variant="primary">More details</Button></Link>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>


  );
}

export default GeneratedAds;