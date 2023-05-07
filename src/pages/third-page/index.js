
import React, { useDeferredValue, useEffect, useState } from 'react'
import SearchTalent from './searchTalent'
import TalentSource from './TalentSource'

const ThirdPage = () => {
  const [talentData, setTalentData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const search = async (event) => {
    event.preventDefault();
    if (!keyword) {
      return;
    }

    setIsSearching(true);

    const requestOptions = {
      method: 'GET'
    };

    try {
      const response = await fetch(`https://a2mwnnax40.execute-api.us-west-1.amazonaws.com/test?keyword=${encodeURIComponent(keyword)}`, requestOptions);
      const data = await response.json();
      setTalentData(data.hits.hits); // Set the talentData state with the fetched data
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setIsSearching(false);
    }
  };

  return (
    <>
      <SearchTalent handleChange={handleChange} search={search} />
      <TalentSource results={talentData} isSearching={isSearching} />

    </>
  )
}

export default ThirdPage
