import { Button, Card, CardContent, Divider, Fab, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'

import React from 'react'
import { useState, useEffect } from 'react'
import TalentPool from './TalentPool'
import Form from './Form'

import Icon from 'src/@core/components/icon'
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import AWS from 'aws-sdk';
import OrderDetail from '../second-page/Orders'
import CandidatesFull from './CandidatesFull'
import Candidates from './Candidates'
import Orders from '../second-page/Orders'

const TalentPoolFull = (props) => {
  const { orderData } = props
  const [active, setActive] = useState("")
  const [search, setSearch] = useState("")

  // console.log(JSON.stringify(csvData[0]))
  // console.log(csvData.filter(data => data.talent_first_name === "Web"))
  AWS.config.update({
    region: 'us-east-1'
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assume IAM role in another AWS account
        const sts = new AWS.STS();

        const assumeRoleParams = {
          RoleArn: 'arn:aws:iam::851565480501:role/talentsourcingLambdaRole59acd701-dev',
          RoleSessionName: '/',
          DurationSeconds: 900
        };
        const assumeRoleResult = await sts.assumeRole(assumeRoleParams).promise();

        // Use temporary credentials to call your Lambda function
        const lambda = new AWS.Lambda({
          region: 'us-east-1',
          credentials: assumeRoleResult.Credentials
        });

        const response = await lambda.invoke({
          FunctionName: 'talent-sourcing-rds',
          Payload: JSON.stringify({})
        }).promise();

        const result = JSON.parse(response.Payload);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <Grid container>
      <Grid item xs={3.5}>
        <div>
          <Card sx={{ height: 600 }}>
            <CardContent sx={{ mt: 4, alignItems: 'center', justifyItems: 'center' }}>
              <TextField fullWidth onChange={(e) => setSearch(e.target.value)}></TextField>
            </CardContent>

            <Divider />

            <Grid item xs={12} container >
              <Grid item xs={7} md={7} sx={{ ml: 4, mt: 1 }}>
                <Icon sx={{ fontSize: 40 }} icon="ri:align-left" />
              </Grid>
              <Button xs={2} sx={{ alignItems: 'flex-end' }} variant='contained'>search</Button>
            </Grid>

            <Divider />

            <List sx={{ p: 3 }}>

              <ListItemButton onClick={() => setActive("NewOrder")}>
                <ListItemIcon>
                  <AddToPhotosIcon />
                </ListItemIcon>
                <ListItemText primary="New Order" />
              </ListItemButton>
            </List>
            <Divider />

            <List sx={{ p: 3 }}>
              <ListItemButton onClick={() => setActive("Active")}>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Active" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Archied" />
              </ListItemButton>
            </List>
            <Divider />

            <List sx={{ p: 3 }}>
              <ListItemButton>
                <ListItemIcon>
                  <BookmarkAddIcon />
                </ListItemIcon>
                <ListItemText primary="Reorder" />
              </ListItemButton>
            </List>

            <Divider />

          </Card>
        </div>
      </Grid>
      <Grid item xs={8}>
        {active === "NewOrder" && <Form close={setActive} />}
        {active === "Active" && <Orders close={setActive} data={orderData} />}
        {!active && <Candidates />}
      </Grid>
    </Grid>
  )
}

export default TalentPoolFull
