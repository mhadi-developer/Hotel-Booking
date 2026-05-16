import React from 'react'
import OffCanvas from '../components/Home/OffCanvas.tsx'
import Header from '../components/Home/Header.tsx'
import "../App.css"
import HeroSection from '../components/Home/HeroSection.tsx'
import HomeAbout from '../components/Home/HomeAbout.tsx'
import Services from '../components/Home/Services.tsx'
import HomeRoom from '../components/Home/HomeRoom.tsx'
import Testimonial from '../components/Home/Testonomial.tsx'
import ChooseUs from '../components/Home/ChooseUs.tsx'
import Gallery from '../components/Home/Gallery.tsx'
import LatestBlog from '../components/Home/Blog.tsx'

const Home = () => {
  return (
      <div>
          <OffCanvas />
          <Header />
      <HeroSection />
      <HomeAbout />
      <Services />
      <HomeRoom />
      <Testimonial />
      <ChooseUs />
      <Gallery />
      <LatestBlog/>
         
    </div>
  )
}

export default Home