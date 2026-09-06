import { useState, useEffect } from 'react'
const Card = ({ title }) => {

const [hasLiked, setHasLiked] = useState(false);

useEffect(() => {
  console.log('${title} has been Liked : ${hasLiked}')

});
  return (
    <div className="card">
      <h2>{title}</h2>
      <button className="button" onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? 'Liked' : 'Like'}
      </button>
    </div>
  )
}

import './App.css'

const App = () => {

  return (
     <div className="CardContainer">
     

      <Card title="Harry Potter and the Philosopher's Stone" />
      <Card title="Harry Potter and the Chamber of Secrets" />
      <Card title="Harry Potter and the Prisoner of Azkaban" />
     </div>
      
    )
  }
export default App