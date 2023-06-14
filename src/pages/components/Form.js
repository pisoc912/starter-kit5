import { Card, Grid, IconButton, TextField, Typography, MenuItem, Select, InputLabel, Button, NativeSelect, Checkbox, ListItemText, OutlinedInput, Chip, Box } from '@mui/material'
import React from 'react'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ulid } from 'ulid';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/router';
import { createCandidateListing } from 'src/graphql/mutations'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';




const Form = ({ close }) => {
  const [user, setUser] = useState("")
  const [error, setError] = useState('')

  const { currentTitle, locationPreference, yearsOfExperience, seniorityLevel, requiredSkills = [], preferredSkills = [], industry = [], education = [] } = user;
  const router = useRouter()

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSelect = async (selectedAddress) => {
    const results = await geocodeByAddress(selectedAddress);
    const addressComponents = results[0].address_components;

    const city = addressComponents.find((component) =>
      component.types.includes("locality")
    ).long_name;

    const state = addressComponents.find((component) =>
      component.types.includes("administrative_area_level_1")
    ).short_name;
    setCity(city);
    setState(state);
    setAddress(selectedAddress);
    setUser({ ...user, locationPreference: locationPreference })
  };

  const requiredNames = [
    "communication",
    "teamwork",
    "problemSolving",
    "initiativeAndEnterprise",
    "planningAndOrganising",
    "self-management",
    "learning",
    "technology",
  ];

  const preferredNames = [
    "cloud",
    "Computing",
    "machineLearning",
    "figma",
    "aws",
    "dataAnalysis",
    "webDevelopment",
    "UserExperienceUX",
    "cybersecurityAnalytics",
  ];

  const IndustryNames = [
    "it",
    "advertisingAndMarketing",
    "healthCare",
    "businessAndFinance",
    "retail",
    "foodAndHospitality",
    "education",
    "artsAndEntertainment",
  ];

  const educationNames = [
    "highschoolDegree",
    "associatesDegree",
    "bachelorsDegree",
    "mastersDegree",
    "doctoralDegree",
  ];


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log({ ...user }, e.target.name, e.target.value)
  }


  const handleAdd = async () => {
    if (!currentTitle || !yearsOfExperience) {
      setError("Please input all required fields!");
    } else {
      console.log(await Auth.currentUserInfo())
      try {
        const id = ulid();

        const { data: candidateData } = await API.graphql(graphqlOperation(createCandidateListing, {
          input: {
            PK: `ACC#${id}`,
            SK: `CAND#${id}`,
            currentTitle: currentTitle,
            locationPreference: address,
            yearsOfExperience: yearsOfExperience,
            seniorityLevel: seniorityLevel,
            requiredSkills: requiredSkills,
            preferredSkills: preferredSkills,
            industry: industry,
            education: education,
          },
        }));
        console.log('Candidate listing created:', candidateData.createCandidateListing);

      } catch (error) {
        console.log(error);
        setError("An error occurred while creating the candidate listing.");
      }
      close(false);
      setError("");
    }
  }



  return (
    <Card sx={{ height: 1000, ml: 4 }}>
      <Grid xs={8}>
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
            {/* <TextField
              label="Location Preference"
              variant="standard"
              value={locationPreference}
              name="locationPreference"
              fullWidth
              onChange={(e) => handleChange(e)}
            /> */}
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              searchOptions={{ types: ["(cities)"], componentRestrictions: { country: "us" }, language: "en", }}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <TextField
                    label="Location Preference"
                    variant="standard"
                    value={address}
                    name="locationPreference"
                    fullWidth
                    {...getInputProps({ placeholder: "Enter location" })} />
                  <div>
                    {loading ? <div>Loading...</div> : null}
                    {suggestions.map((suggestion, idx) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#e8e8e8" : "#fff",
                      };

                      return (
                        <div key={idx} {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
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
              name="seniorityLevel"
              fullWidth
              value={seniorityLevel}
              onChange={(e) => handleChange(e)}
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
              name='requiredSkills'
              value={requiredSkills}
              onChange={(e) => handleChange(e)}
              renderValue={(selected) => selected.join(', ')}
            >
              {requiredNames.map((name) => (
                <MenuItem key={name} value={name}>
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
              name="preferredSkills"
              value={preferredSkills}
              onChange={(e) => handleChange(e)}
              renderValue={(selected) => selected.join(', ')}
            >
              {preferredNames.map((name) => (
                <MenuItem key={name} value={name}>
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
              name='industry'
              value={industry}
              onChange={(e) => handleChange(e)}
              renderValue={(selected) => selected.join(', ')}
            >
              {IndustryNames.map((name) => (
                <MenuItem key={name} value={name}>
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
              name='education'
              value={education}
              onChange={(e) => handleChange(e)}
              renderValue={(selected) => selected.join(', ')}
            >
              {educationNames.map((name) => (
                <MenuItem key={name} value={name}>
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
