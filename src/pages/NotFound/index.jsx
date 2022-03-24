import { Home } from '@mui/icons-material';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <h1>404- Page not Found</h1>
      <Button type="button" onClick={() => navigate('/')}><Home /></Button>
    </div>
  );
}

export default NotFound;
