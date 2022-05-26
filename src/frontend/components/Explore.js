import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Row, Col, Card, Button } from 'react-bootstrap';
import './App.css';

const Explore = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i);
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId);
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId);
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        });
      }
    }
    setLoading(false);
    setItems(items);
  };

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait();
    loadMarketplaceItems();
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);
  if (loading)
    return (
      <div className='container'>
        <main style={{ padding: '1rem 0' }}>
          <h2>Loading...</h2>
        </main>
      </div>
    );
  return (
    <div className='container'>
      <div className="flex justify-center">
        {items.length > 0 ? (
          <div className="px-5 container">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
              {items.map((item, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card className="card">
                    <Card.Img variant="top" src={item.image} className="card__img" />
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
                            {ethers.utils.formatEther(item.totalPrice)}
                          </div>
                        </div>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="p-0">
                      <div className="d-grid">
                        <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg" className="card__button">
                          {/* Buy for {ethers.utils.formatEther(item.totalPrice)} ETH */}
                          Place a bid
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <main style={{ padding: '1rem 0' }}>
            <h2>No listed assets</h2>
          </main>
        )}
      </div>
    </div>
  );
};
export default Explore;
