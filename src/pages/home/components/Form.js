import { Card, Grid, IconButton, TextField, Typography, MenuItem, Select, InputLabel, Button, NativeSelect, Checkbox, ListItemText, OutlinedInput } from '@mui/material'
import React from 'react'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';


// import uuid from 'react-uuid';
import { useRouter } from 'next/router';



const API_URL = 'https://kasek7o0kk.execute-api.us-west-2.amazonaws.com/test';


const Form = ({ close }) => {
  const [user, setUser] = useState("")
  const [error, setError] = useState('')
  const [requiredSkills, setRequiredSkills] = useState([])
  const [preferredSkills, setPreferredSkills] = useState([])
  const [Industry, setIndustry] = useState([])
  const [education, setEducation] = useState([])
  const id = new Date().getTime();
  const { currentTitle, locationPreference, yearsOfExperience, seniorityLevel, requiredSkillSets, industry } = user;
  const router = useRouter()

  const requiredNames = [
    "Communication",
    "Teamwork",
    "Problem solving",
    "Initiative and enterprise",
    "Planning and Organising",
    "Self-management",
    "Learning",
    "Technology",
  ];

  const preferredNames = [
    "Cloud Computing",
    "Machine Learning",
    "Figma",
    "AWS",
    "Data Analysis",
    "Web Development",
    "LUser experience (UX)",
    "Cybersecurity analytics",
  ];

  const IndustryNames = [
    "IT",
    "Advertising and marketing",
    "Health care",
    "Business and finance",
    "Retail",
    "Food and hospitality ",
    "Education",
    "Arts and entertainment",
  ];

  const educationNames = [
    "High School Degree",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree",
  ];

  const handleClicked = (event) => {
    const {
      target: { value },
    } = event;
    setRequiredSkills(typeof value === 'string' ? value.split(',') : value,);
    setPreferredSkills(typeof value === 'string' ? value.split(',') : value,);
    setIndustry(typeof value === 'string' ? value.split(',') : value,);
    setEducation(typeof value === 'string' ? value.split(',') : value,);
  };

  const handleChange = (e) => {
    setUser({ ...user, id: id, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  const addUser = async (e) => {
    await axios.post(`${API_URL}`, e)
  }

  const handleAdd = async () => {
    if (!currentTitle || !locationPreference || !yearsOfExperience) {
      setError("please input all input Filed!")
    } else {
      await addUser(user)

      close(false)
      setError("")
    }
  }



  return (
    <Card sx={{ height: 1000, ml: 4 }}>
      <Grid>
        <IconButton onClick={() => close(false)}><CloseIcon /></IconButton>
      </Grid>

      <Grid container sx={{ height: 20, mt: 5, alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6'>What's your ideal candidate profile for this position?</Typography>
        <Grid item xs={12} sx={{ m: 6, alignItems: 'center', justifyContent: 'center' }}>
          <Typography lineHeight={2} variant='body2'>On-demand sourcing is a fast and effective way to fill your recruitment pipeline with quality candidates. You will specify the ideal candidate profile for each sourcing request and get 50 matching prospects within 1-2 business days.</Typography>
        </Grid>

        <Grid container sx={{ m: 2 }}>
          <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
            <TextField
              required
              label="Current Title"
              variant="standard"
              value={currentTitle}
              fullWidth
              name="currentTitle"
              onChange={(e) => handleChange(e)} />
          </Grid>
          <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
            <TextField
              required
              label="Location Preference"
              variant="standard"
              value={locationPreference}
              name="locationPreference"
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Years of Experience*
            </InputLabel>
            <NativeSelect
              required
              defaultValue={""}
              fullWidth
              name="yearsOfExperience"
              value={yearsOfExperience}
              onChange={(e) => handleChange(e)}
            >
              <option value={""}>Select...</option>
              <option value={"Less than 1 year"}>Less than 1 year</option>
              <option value={"1-3 years"}>1-3 years</option>
              <option value={"3-5 years"}>3-5 years</option>
              <option value={"Over 5 years"}>over 5 years</option>
            </NativeSelect>
          </Grid>
          <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Seniority Level*
            </InputLabel>
            <NativeSelect
              required
              defaultValue={""}
              fullWidth
              value={seniorityLevel}
              name="seniorityLevel"
              onChange={(e) => handleChange(e)}
              inputProps={{
                id: 'uncontrolled-native'
              }}
            >
              <option value={""}>Select...</option>
              <option >Entry</option>
              <option >Associate</option>
              <option >Senior</option>
            </NativeSelect>

          </Grid>

          <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Required Skill Sets*
            </InputLabel>
            <Select
              multiple
              fullWidth
              value={requiredSkills}
              onChange={handleClicked}
              renderValue={(selected) => selected.join(', ')}
            >
              {requiredNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={requiredSkills.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Preferred Skilled Sets
            </InputLabel>
            <Select
              defaultValue={""}
              fullWidth
              multiple
              value={preferredSkills}
              onChange={(e) => handleClicked(e)}
              renderValue={(selected) => selected.join(', ')}
            >
              {preferredNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={preferredSkills.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Industry*
            </InputLabel>
            <Select
              defaultValue={""}
              fullWidth
              multiple
              required
              value={Industry}
              onChange={(e) => handleIndustry(e)}
              renderValue={(selected) => selected.join(', ')}
            >
              {IndustryNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={Industry.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Education Level
            </InputLabel>
            <Select
              defaultValue={""}
              fullWidth
              multiple
              required
              value={education}
              onChange={(e) => handleEducation(e)}
              renderValue={(selected) => selected.join(', ')}
            >
              {educationNames.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={education.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sx={{ m: 4, ml: 10 }}>
            <Typography>Additional Comment (eg.language skills,certificates,major, etc.)</Typography>
            <Grid item xs={12} >
              <TextField fullWidth multiline rows={7}></TextField>
            </Grid>

          </Grid>



        </Grid>
        {error && <h4>{error}</h4>}
        <Button onClick={() => handleAdd()}>Submit</Button>
      </Grid>
    </Card>



  )
}

export default Form
