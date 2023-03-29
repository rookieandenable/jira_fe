import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { HashRouter as Router } from 'react-router-dom'
// import { Routes, Route } from 'react-router'
import UnAuthorizedPage from './views/unauthorized'
import Home from './views/home'
import ProjectDetail from './views/projectDetail'
import { App } from 'antd'

const Page: React.FC = () => (
  <Router basename='/jira_fe/'>
    <Routes>
      <Route index path='/' element={ <UnAuthorizedPage /> } />
      <Route path='/home' element={ <Home /> } />
      <Route path='/home/:projectId/*' element={ <ProjectDetail /> } />
    </Routes>
  </Router>
)

const MyApp: React.FC = () => (
  <App>
    <Page />
  </App>
)

export default MyApp