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
import CountriesReached from '../../Components/CountriesReached/CountriesReached'
import TestimonialHome from '../../Components/TestimonialHome/TestimonialHome'
import FaqHome from '../../Components/FaqHome/FaqHome'
import ContactHome from '../../Components/ContactHome/ContactHome'
import UpdateHome from '../../Components/UpdateHome/UpdateHome'
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
        <CountriesReached/>
        <TestimonialHome/>
        <FaqHome/>
        <ContactHome/>
        <UpdateHome/>

    </div>
  )
}

export default Home
