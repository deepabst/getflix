import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from './Search'

function App() {

  return (
    <>
      <h1>GETFLIX</h1>
      <div className="card">
        <Search />
        <p>
          Search for your favorite movies
        </p>
      </div>
    </>
  )
}

export default App
