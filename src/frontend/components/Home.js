import {useNavigate} from "react-router";
import './Home.css'
import NftCard from "./Card";

const Home = ({marketplace}) => {

  const items = [
    {id: 1, name: 'Virtual Arts', totalPrice: 3},
    {id: 2, name: 'CryptoSlam', totalPrice: 10},
    {id: 3, name: 'Moonbirds', totalPrice: 5},
    {id: 4, name: 'Distance', totalPrice: 2},
    {id: 5, name: 'Cyber Ghost', totalPrice: 3},
    {id: 6, name: 'The Amigos', totalPrice: 7}
  ]

  const navigate = useNavigate();

  const navigateToExplore = () => {
    navigate('/explore')
  }
  const navigateToCreate = () => {
    navigate('/create')
  }

  return (
    <div className='container my-5'>
      <div className="row">
        <div className="col-6">
          <div className='row'>
            <div className='fs-1 fw-bold'>
              Explore, Buy and Sell the <span style={{color: '#3861FB'}}>Best NFTs!</span>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="row my-5">
            <div className="col-6">
              <button
                  className='home__btn_explore'
                  onClick={navigateToExplore}>
                Explore
              </button>
            </div>
            <div className="col-6">
              <button
                  className='home__btn_create'
                  onClick={navigateToCreate}>
                Create
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          {/* Count */}

          <div className="row">
            <div className="col-4">
              <div className="row">
                <div className='fw-bold fs-1'>
                  32k+
                </div>
              </div>
              <div className="row">
                <div>
                  Artworks
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className='fw-bold fs-1'>
                  20k+
                </div>
              </div>
              <div className="row">
                <div>
                  Auctions
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className='fw-bold fs-1'>
                  12k+
                </div>
              </div>
              <div className="row">
                <div>
                  Creators
                </div>
              </div>
            </div>
          </div>

        {/* COUNTS */}

        </div>
        {/* SECOND COLUMN */}
        <div className="col-6 p-5">
          <NftCard marketplace={undefined} item={items[0]} key={22}></NftCard>
        </div>
      </div>

    {/*  */}

      <div className="row">
        <h1 className="col-12 text-center mb-5">Explore NFT’s collection </h1>
        <div className="col-12">
          <div className="row">
            { items.map((item, id) => (
                <div className='col-4 mb-3'>
                  <NftCard item={item} key={item.id}/>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
