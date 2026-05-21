import React from 'react'
import OffCanvas from '../components/Home/OffCanvas'
import Header from '../components/Home/Header'
import Breadcrumb from '../components/Rooms/BreadCrumb'
import AboutSection from '../components/About/AboutSection'
import ChooseUs from '../components/About/ChooseUs'
import HistorySection from '../components/About/HistorySection'

const AboutUs = () => {
  return (
      <div>
          <OffCanvas />
          <Header />
          <Breadcrumb />
          <AboutSection />
          <ChooseUs />
          <HistorySection/>
    </div>
  )
}

export default AboutUs