import React from 'react'
import Notes from './Notes'
function Home({setProgress}) {
  return (
    <div>
      <h1>Welcome to Virtual Notebook</h1>
      <Notes setProgress={setProgress} />
    </div>
  )
}

export default Home
