import { CloseOutlined } from '@mui/icons-material'
import { Button, Card, CardContent, Grid, IconButton, Link, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import CandidatesFull from '../component/CandidatesFull'
import CandidateListAfterSubmit from './CandidateListAfterSubmit'
import OrderDetail from './OrderDetail'

const Orders = ({ close, data, canData, getCandidateData }) => {
  const [active, setActive] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState([]);

  const handleCardClick = (data) => {
    setDialogData([data]);
    setIsDialogOpen(true);

  }

  const handleClose = () => {
    setIsDialogOpen(false);
  }


  return (
    <div>
      {data.map((order, index) =>
        <Card key={index} sx={{ minHeight: 100, mb: 2, ml: 4, display: 'flex' }}>
          <ListItem direction='row' alignItems='center' justifycontent='center' >
            <ListItemText secondary="Order Number" primary={order.id.substring(0, 8)} />
            <ListItemText secondary="Order Date" primary={order.createdAt.substring(5, 10)} />
            <ListItemText secondary="Title" primary={order.currentTitle} />
            <Button onClick={() => handleCardClick(order)}>Order Detail</Button>
            <Button onClick={() => setActive("Candidates")}>Check Candidates List</Button>
          </ListItem>


        </Card>
      )}

      <OrderDetail orderData={dialogData} open={isDialogOpen} onClose={handleClose} />
      {active == "Candidates" && <CandidatesFull canData={canData} getCandidateData={getCandidateData} />}

    </div>
  )
}

export default Orders
