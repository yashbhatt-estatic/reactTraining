/* eslint-disable jsx-a11y/label-has-associated-control */
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function IpRouting() {
  const navigate = useNavigate();
  const [selectedRows, setSelection] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState();

  const formik = useFormik({
    initialValues: {
      routes: '',
    },
    onSubmit: (values) => {
      navigate(`/${values.routes}`);
    },
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: 'Snow',
      firstName: 'Jon',
      age: 35,
    },
    {
      id: 2,
      lastName: 'Lannister',
      firstName: 'Cersei',
      age: 42,
    },
    {
      id: 3,
      lastName: 'Lannister',
      firstName: 'Jaime',
      age: 45,
    },
    {
      id: 4,
      lastName: 'Stark',
      firstName: 'Arya',
      age: 16,
    },
    {
      id: 5,
      lastName: 'Targaryen',
      firstName: 'Daenerys',
      age: 20,
    },
    {
      id: 6,
      lastName: 'Melisandre',
      firstName: 'Dahug',
      age: 150,
    },
    {
      id: 7,
      lastName: 'Clifford',
      firstName: 'Ferrara',
      age: 44,
    },
    {
      id: 8,
      lastName: 'Frances',
      firstName: 'Rossini',
      age: 36,
    },
    {
      id: 9,
      lastName: 'Roxie',
      firstName: 'Harvey',
      age: 65,
    },
  ];

  return (
    <Container>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="mb-3 mt-3 w-25">
          <label htmlFor="email" className="form-label">
            Route:
          </label>
          <input
            type="text"
            className="form-control"
            id="routes"
            placeholder="Enter page name"
            name="routes"
            onChange={formik.handleChange}
            value={formik.values.routes}
          />
        </div>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </form>
      <Container className="bg-light d-flex flex-column h-100 w-100 mt-3 mx-auto">
        <DataGrid
          autoHeight
          checkboxSelection
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[2, 5, 7]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSelectionModelChange={(newSelection) => {
            setData(` ${newSelection} `);
          }}
          onSelectionChange={(newSelection) => {
            setSelection(newSelection.rowIds);
          }}
        />
        {selectedRows.map((row) => (
          <span>{row}</span>
        ))}
      </Container>
      <h1>
        Selected Data:-
        {' '}
        {data}
      </h1>
    </Container>
  );
}

export default IpRouting;
