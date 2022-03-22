import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  NavLink,
  useSearchParams,
} from 'react-router-dom';

function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  // single-time read
  const params = Object.fromEntries([...searchParams]);
  console.log('Mounted:', params);

  useEffect(() => {
    // read the params on component load and when any changes occur
    const currentParams = Object.fromEntries([...searchParams]);
    // get new values on change
    console.log('useEffect:', currentParams);
    // update the search params programmatically
    setSearchParams({ sort: 'name', order: 'ascending' });
  }, [searchParams]);

  return <div>Users</div>;
}
function Posts() {
  return <div>Posts</div>;
}

function App() {
  return (
    <div className="app">
      <div className="nav">
        <NavLink to="users" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
          Users
        </NavLink>
        <NavLink to="posts" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
          Posts
        </NavLink>
      </div>
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<Posts />} />
        <Route path="" element={<Navigate to="/users" />} />
      </Routes>
    </div>
  );
}

export default App;
