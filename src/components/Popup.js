import React, { useEffect } from 'react'
import { checkWin } from '../helpers/helpers'

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
  let finalMessage = ''
  let finalMessageRevealWord = ''
  let playable = true

  //checking for win OR lose ... if it comes back as '', it means the game is still on
  if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
    finalMessage = 'Congrats! You won!'
    playable = false
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
    finalMessage = 'You lost'
    finalMessageRevealWord = `... the word was: ${selectedWord}`
    playable = false
  }
  // no dependancies → it will run every time we type a letter
  useEffect(() => setPlayable(playable))

  return (
   // display only if finalMessage is not blank ('')
    <div className='popup-container' style={finalMessage !== '' ? {display: 'flex'} : {}}>
      <div className='popup'>
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  )
}

export default Popup
