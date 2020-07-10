import React from 'react'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function LinksList({ links }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>№ п/п</TableCell>
            <TableCell>Оригинальная ссылка</TableCell>
            <TableCell>Сокращенная</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((link, index) => (
            <TableRow key={link._id}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell>{link.from}</TableCell>
              <TableCell>{link.to}</TableCell>
              <TableCell><Link to={`/detail/${link._id}`}>Открыть</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LinksList
