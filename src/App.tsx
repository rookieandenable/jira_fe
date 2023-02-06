import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import UnAuthorizedPage from './views/unauthorized'
import Home from './views/home'
import ProjectDetail from './views/projectDetail'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={ <UnAuthorizedPage /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/home/:projectId/*' element={ <ProjectDetail /> } />
      </Routes>
    </Router>
  )
}

export default App