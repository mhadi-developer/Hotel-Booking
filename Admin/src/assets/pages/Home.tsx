import React from 'react'
import Sidebar from '../components/Home/SideBar'
import Header from '../components/Home/Header'
import Dashboard from '../components/Home/Dashboard'
import Layout from '../components/Home/Layout'


const Home = () => {
  return (
    <div>
      <Layout>
        <Dashboard />
        </Layout>
          
    </div>
  )
}

export default Home