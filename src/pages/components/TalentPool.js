import React from 'react'
import { Box, Button, Card, Grid, Paper, TableCell, TableRow, styled, Table, TableHead, Typography, IconButton, Tooltip, CardContent, CardHeader, TableBody, TableContainer, TablePagination } from '@mui/material'
import { useState, useEffect } from 'react'
import { Storage } from 'aws-amplify';





const TalentPool = (props) => {
  const { search } = props
  const [csvData, setCsvData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filteredData, handleSearch] = useSearch(csvData);


  useEffect(() => {
    getCsvData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const getCsvData = async () => {
    try {
      Storage.configure({ region: 'us-west-1' })
      const listResponse = await Storage.list('talentsource/')

      const fileKey = listResponse.results[1].key


      const file = await Storage.get(fileKey, {
        level: 'public',
        contentType: 'text/csv'
      })
      const response = await fetch(file)
      const text = await response.text()

      const rows = text.split('\n')

      const headers = rows[0].split(',')

      const csvData = rows.slice(1).map(row => {
        const values = row.split(',');
        const obj = {};

        values.forEach((value, index) => {
          value = value.replace(/"/g, "").trim();
          obj[headers[index]] = value;
        });

        return obj;
      });

      setCsvData(csvData);
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4">Talent Pool</Typography>
        <TableContainer sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Current Position</TableCell>
                <TableCell>AP Profile URL</TableCell>
                <TableCell>LinkedIn URL</TableCell>
                <TableCell>Employer</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Employee Size</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Keywords</TableCell>
                <TableCell>Website URL</TableCell>
                <TableCell>LinkedIn URL</TableCell>
                <TableCell>Twitter URL</TableCell>
                <TableCell>Other Twitter URL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((data) => Object.values(data).every((value) => value !== "N/A"))
                .filter((data) => data.talent_first_name.toLowerCase().includes(search.toLowerCase()))
                .map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.talent_person_name}</TableCell>
                    <TableCell>{data.talent_employment_current_position}</TableCell>
                    <TableCell>{data.talent_profile_AP_url}</TableCell>
                    <TableCell>{data.talent_linkedin_url}</TableCell>
                    <TableCell>{data.talent_employment_current_company_name}</TableCell>
                    <TableCell>{data.talent_location}</TableCell>
                    <TableCell>{data.company_employee_size}</TableCell>
                    <TableCell>{data.company_industry}</TableCell>
                    <TableCell>{data.company_keywords}</TableCell>
                    <TableCell>{data.company_website_url}</TableCell>
                    <TableCell>{data.company_linkedin_url}</TableCell>
                    <TableCell>{data.company_twitter_url}</TableCell>
                    <TableCell>{data.talent_twitter_url_link}</TableCell>
                  </TableRow>
                ))}
            </TableBody>


          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={csvData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  )
}

export default TalentPool
