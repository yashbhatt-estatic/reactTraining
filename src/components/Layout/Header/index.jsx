import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-light sticky-top bg-light">
      <div className="container">
        <div className="header">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h4" to="/">Home</Link></Button>
            </li>
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h4" to="/User">User</Link></Button>
            </li>
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h4" to="/Counter">Counter</Link></Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
