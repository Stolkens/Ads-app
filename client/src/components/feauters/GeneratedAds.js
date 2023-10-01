import { useDispatch, useSelector } from "react-redux";
import { getAds, loadAdsRequest } from "../../redux/adsRedux";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const GeneratedAds = () => {

  const dispatch = useDispatch();
  const ads = useSelector(getAds)
  console.log(ads);

  useEffect(() => {
    dispatch(loadAdsRequest())
  }, [dispatch])

  return (
    <div>{ads.map(ad =>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`http://localhost:8000/uploads/${ad.image}`} />
        <Card.Body>
          <Card.Title>{ad.title}</Card.Title>
          <Card.Text>
            {ad.location}
          </Card.Text>
          <Button variant="primary">More details</Button>
        </Card.Body>
      </Card>
    )}
    </div>

  );
}

export default GeneratedAds;