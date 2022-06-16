import { Card, Button } from 'react-bootstrap';
import {useNavigate} from "react-router";
import './App.css';

const NftCard = ({ marketplace, item }) => {
  const navigate = useNavigate();

  const buyMarketItem = async (item) => {
    if (marketplace) {
      await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait();
      window.location.reload(false);
    } else {
      navigate('/explore')
    }
  };

  return (
    <Card>
      <Card.Img variant="top" src={require(`../images/${item.id}.png`)} className="card__img" />
      <Card.Body color="secondary" className="px-0">
        <Card.Title className="text-start mb-3">
          <div className="card--price">
            <div>Name</div>
            <div>{item.name}</div>
          </div>
        </Card.Title>
        <Card.Text>
          <span className="card--price">
            <span>Current Bid</span>
            <span className="fw-bold" style={{ color: '#fff' }}>
              { marketplace === undefined ? item.totalPrice : (item.totalPrice)}
            </span>
          </span>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="p-0">
        <div className="d-grid">
          <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg" className="card__button">
            Start trading now
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
export default NftCard;
