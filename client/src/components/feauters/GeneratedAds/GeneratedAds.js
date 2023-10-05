import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAdsRequest } from "../../../redux/adsRedux";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './GeneratedAds.module.scss';
import { Link } from "react-router-dom";

const GeneratedAds = () => {

  const dispatch = useDispatch();
  const ads = useSelector(getAds)
  console.log(ads);

  useEffect(() => {
    dispatch(loadAdsRequest())
  }, [dispatch])

  return (
    <div className={`${styles.container} mt-3 mb-3`}>{ads.map(ad =>
      <Card key={ad._id} className={styles.card}style={{ width: '20rem'}}>
        <Card.Img  className={styles.image} variant="top" src={`http://localhost:8000/uploads/${ad.image}`} />
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

  );
}

export default GeneratedAds;