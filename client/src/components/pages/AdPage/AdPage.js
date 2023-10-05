import { useParams, Navigate } from "react-router-dom";
import { getAdById } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";


const AdPage = () => {

  const { id } = useParams();
  console.log('id', id)
  const adData = useSelector(ad => getAdById(ad, id));
  console.log('adData',adData);

  if(!adData) return <Navigate to="/" />

  return (
    <div>{adData.title}</div>
  );
}

export default AdPage;