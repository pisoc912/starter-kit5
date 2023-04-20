import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import useSearch from 'src/@core/hooks/useSearch';
import { Storage } from 'aws-amplify';


const PopUpProfile = (props) => {
  const { open, setOpen } = props
  const [csvData, setCsvData] = useState([])
  const [filteredData] = useSearch(csvData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    getCsvData();
  }, []);

  const getCsvData = async () => {
    try {
      Storage.configure({ region: 'us-west-1' })
      const listResponse = await Storage.list('talentsource/')

      const fileKey = listResponse.results[2].key


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
    <div>
      {
        filteredData.map((data, index) => (
          <Dialog
            key={index}
            open={open}
            onClose={handleClickOpen}
            maxWidth='lg'
            fullWidth
            PaperProps={{ sx: { width: "80%", height: "80%" } }}
            display='flex'
            direction='column'
          >

            <DialogContent key={index}>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant='h5'>{data.talent_person_name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h5'>{data.job_history}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h5'>{data.industry_name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h5'>hello</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>

                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
          </Dialog>
        ))
      }
    </div>

  )
}

export default PopUpProfile
