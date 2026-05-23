import React from 'react'
import Homesec from '../../Components/Homesec/Homesec'
import IJwelcomes from '../../Components/IJwelcomes/IJwelcomes'
import AboutGerenal from '../../Components/AboutGerenal/AboutGerenal'
import DiciplineWe from '../../Components/DiciplineWe/DiciplineWe'
import Globally from '../../Components/Globally/Globally'
import Publication from '../../Components/Publication/Publication'
import Researchers from '../../Components/Researchers/Researchers'
import Samplearticles from '../../Components/Samplearticles/Samplearticles'
import ImportantDates from '../../Components/ImportantDates/ImportantDates'
const Home = () => {
  return (
    <div>
        <Homesec />
        <IJwelcomes/>
        <AboutGerenal/>
        <DiciplineWe/>
        <Globally/>
        <Publication/>
        <Researchers/>
        <Samplearticles/>
        <ImportantDates/>

    </div>
  )
}

export default Home
