import clsx from 'clsx'
import React, { useDeferredValue, useEffect, useState } from 'react'
import SearchTalent from './searchTalent'
import TalentSource from './TalentSource'

const ThirdPage = () => {
  const [search, setSearch] = useState("")
  const [talentData, setTalentData] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const deferredInput = useDeferredValue(search)

  useEffect(() => {
    if (deferredInput !== "") {
      fetchData(deferredInput).then((data) => {
        setTalentData(data)
      })
    } else {
      setTalentData([])
    }
  }, [isSearching, deferredInput])


  const fetchData = async (input) => {
    return fetch(
      `https://a2mwnnax40.execute-api.us-west-1.amazonaws.com/test?q=${input}`
    )
      .then((res) => res.json())

      .then((talentData) => {
        return talentData.hits.hits

      })

  }


  const handleChange = (e) => {
    setSearch(e.target.value)

  }



  return (
    <>
      <SearchTalent handleChange={handleChange} />
      <TalentSource results={talentData} />

    </>
  )
}

export default ThirdPage
