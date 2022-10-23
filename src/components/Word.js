import React from 'react'

const Word = ({ selectedWord, correctLetters }) => {
  return (
    <div className='word'>
      {selectedWord.split('').map((letter, i) => {
        // for letters
        if (/[a-z]/.test(letter)) {
          return (
            <span className='letter' key={i}>
              {correctLetters.includes(letter) ? letter : ''}
            </span>
          )
          // for non letters
        } else {
          return (
            <span className='non-letter' key={i}>
              {letter}
            </span>
          )
        }
      })}
    </div>
  )
}

export default Word
