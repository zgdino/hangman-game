import React from 'react'

const WrongLeters = ({wrongLetters}) => {
  return (
    <div className='wrong-letters-container'>
      <div>
        {wrongLetters.length > 0 && <p>Wrong</p>}
        {wrongLetters
        .map((letter, i) => <span key={i}>{letter}</span>)
        // display wrong letters in order they are pressed
        .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)}
      </div>
    </div>
  )
}

export default WrongLeters