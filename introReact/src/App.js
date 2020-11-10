import React, { useState } from 'react'
import './App.css'


import Header from './componets/Header'

function App() {
  const [projects, setProjects] = useState(['app1', 'frontend'])

  function handleAddProject() {
    setProjects([...projects,`New project ${Date.now()}`])  
  }

  return (
    <>
      <Header title='Projects' />
      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}


export default App