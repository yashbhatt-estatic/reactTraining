import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Container, TableCell } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import './style.scss';

function createData(name) {
  return {
    name,
  };
}

const rows = [createData('Yash'), createData('Vishal'), createData('Tejas')];

export default function QueryParameter() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  return (
    <Container className="bg-light border mx-auto w-50 text-dark">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>
                <Button>
                  <Link to={`users?sort=${row.name}&pageNo=10&pagesize=100`}>Click</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {params.sort ? (
        <div className="px-3">
          <h4>
            sort:
            {' '}
            {params.sort}
          </h4>
          <h4>
            pageno:
            {params.pageNo}
          </h4>
          <h4>
            pagesize:
            {' '}
            {params.pagesize}
          </h4>
        </div>
      ) : (
        null
      )}
    </Container>
  );
}
