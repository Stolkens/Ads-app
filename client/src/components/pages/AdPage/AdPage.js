import { useParams, Navigate } from "react-router-dom";
import { getAdById } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";


const AdPage = () => {

  const { id } = useParams();
  const adData = useSelector(ad => getAdById(ad, id));

  if (!adData) return <Navigate to="/" />

  return (
    <div>
      <Card className="my-5" style={{ width: '30rem' }}>
        <Card.Img variant="top" src={`http://localhost:8000/uploads/${adData.image}`} />
        <Card.Body>
          <Card.Title>{adData.title}</Card.Title>
          <Card.Text>
            {adData.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Date of published: {adData.dateOfPub}</ListGroup.Item>
          <ListGroup.Item>Price: {adData.price}</ListGroup.Item>
          <ListGroup.Item>Location: {adData.location}</ListGroup.Item>
        </ListGroup>
        <Card.Body className="d-flex justify-content-between">
          <Link to={`/adEdit/${adData._id}`}><Button>Edit</Button></Link>
          <Link to={`/`}><Button>Delete</Button></Link>
        </Card.Body>
      </Card></div>
  );
}

export default AdPage;