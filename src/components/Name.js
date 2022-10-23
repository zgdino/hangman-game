import React, { useState } from 'react'

const Name = ({ playAgain, setPlayable, setUserName, getQuote }) => {
  const [name, setName] = useState('')
  const [clicked, setClicked] = useState(false)
  let goodToGo = false
  setPlayable(goodToGo)

  const handleChange = (e) => {
    setName(e.target.value)
    // console.log('value is:', e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    setUserName(name)
    // console.log('name is 👉️', name)
    if (name.length > 0) {
      setClicked(true)
    }
    goodToGo = true
    // setPlayable(goodToGo)
    playAgain()
  }

  return (
    <div
      className='name-container'
      style={!clicked ? { display: 'flex ' } : {}}
    >
      <div className='popup'>
        <h2>Enter Name</h2>
        <input
          type='text'
          value={name}
          name='message'
          onChange={handleChange}
        />

        <h2>Name: {name}</h2>

        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  )
}

export default Name
