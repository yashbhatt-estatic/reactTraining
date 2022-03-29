import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-light sticky-top bg-light">
      <div className="container">
        <div className="header">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h5" to="/">Home</Link></Button>
            </li>
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h5" to="/User">User</Link></Button>
            </li>
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h5" to="/Counter">Counter</Link></Button>
            </li>
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h5" to="/QueryParameter">Query-Parameter</Link></Button>
            </li>
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h5" to="/Form">SignupForm</Link></Button>
            </li>
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h5" to="/IpRouting">InputRouting</Link></Button>
            </li>
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h5" to="/UserCrud">User-CRUD</Link></Button>
            </li>
            <li className="nav-item">
              <Button><Link className="text-decoration-none text-dark h5" to="/AxiosUserCrud">Axios-User-CRUD</Link></Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
