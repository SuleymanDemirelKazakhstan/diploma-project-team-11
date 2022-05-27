import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Row, Col, Card, Button } from 'react-bootstrap';
import {useNavigate} from "react-router";
import nftImg from './testNft.png'
import './App.css';

const NftCard = ({ marketplace, item, key }) => {
  const navigate = useNavigate();

  const buyMarketItem = async (item) => {
    if (marketplace) {
      await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait();
      // loadMarketplaceItems();
      window.location.reload(false);
    } else {
      navigate('/explore')
    }
  };

  return (
    <Card key={key}>
      <Card.Img variant="top" src={ marketplace === undefined ? nftImg : item.image} className="card__img" />
      <Card.Body color="secondary" className="px-0">
        <Card.Title className="text-start mb-3">
          <div className="card--price">
            <div>Name</div>
            <div>{item.name}</div>
          </div>
        </Card.Title>
        <Card.Text>
          <div className="card--price">
            <div>Current Bid</div>
            <div className="fw-bold" style={{ color: '#fff' }}>
              { marketplace === undefined ? item.totalPrice : ethers.utils.formatEther(item.totalPrice)}
            </div>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="p-0">
        <div className="d-grid">
          <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg" className="card__button">
            Place a bid
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};
export default NftCard;
