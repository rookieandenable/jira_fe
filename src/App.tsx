import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
// import { HashRouter as Router } from 'react-router-dom'
// import { Routes, Route } from 'react-router'
import UnAuthorizedPage from './views/unauthorized'
import Home from './views/home'
import ProjectDetail from './views/projectDetail'
import { App } from 'antd'

const Page: React.FC = () => (
  <Router>
    <Routes>
      <Route path='/' element={ <UnAuthorizedPage /> } />
      <Route path='/home' element={ <Home /> } />
      <Route path='/home/:projectId/*' element={ <ProjectDetail /> } />
    </Routes>
  </Router>
)

const MyApp: React.FC = () => {
  // const navigate = useNavigate()

  return (
    <App>
      <Page />
      <div>11111</div>
    </App>
  )
}

export default MyApp