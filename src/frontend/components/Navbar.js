import {Link, useNavigate} from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import NftLogo from './logo.svg';
import './App.css';

const Navigation = ({ web3Handler, account }) => {

  // const redirectToHomePage = () => {
  //   navigate('/')
  // }

  return (
    <Navbar expand="lg" variant="light">
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to={"/"}>
            <img src={NftLogo} width="35" height="35" className="d-inline-block align-top" alt="Cryptostan" />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* <Nav.Link as={Link} to="/">
              Home
            </Nav.Link> */}
            <Nav.Link as={Link} to="/create">
              Create
            </Nav.Link>
            <Nav.Link as={Link} to="/my-listed-items">
              My Listed Items
            </Nav.Link>
            <Nav.Link as={Link} to="/my-purchases">
              My Purchases
            </Nav.Link>
            <Nav.Link as={Link} to="/explore">
              Explore
            </Nav.Link>
          </Nav>
          <Nav className="ps-3">
            {account ? (
              <Nav.Link
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-0"
              >
                <Button variant="outline" className="nav__btn">
                  {account.slice(0, 5) + '...' + account.slice(38, 42)}
                </Button>
              </Nav.Link>
            ) : (
              <Button onClick={web3Handler} variant="outline" className="nav__btn">
                Connect Wallet
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
