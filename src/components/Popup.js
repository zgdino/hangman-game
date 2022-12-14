import React, { useEffect } from 'react'
import { checkWin } from '../helpers/helpers'
import axios from 'axios'

const url =
  'https://my-json-server.typicode.com/Serapion-ZG/hangman-ts/highscores'

const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setPlayable,
  playAgain,
  quoteID,
  quoteLength,
  uniqueChar,
  userName,
  duration,
  highScore,
}) => {
  let finalMessage = ''
  let finalMessageRevealWord = ''
  let playable = true
  let score = 0

  let table = [...highScore]

  console.log('TABLE IS↓')
  console.log(
    table.map((item) => {
      return item.userName
    })
  )

  if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
    finalMessage = 'Congrats! You won!'
    playable = false
    score = Math.trunc(100 / (1 + wrongLetters.length))

    // POST data in case of win
    try {
      const resp = axios.post(url, {
        quoteId: quoteID,
        length: quoteLength,
        userName: userName,
        uniqueCharacters: uniqueChar,
        errors: wrongLetters.length,
        duration: duration,
      })
      // console.log(resp.data)
    } catch (error) {
      console.log(error.resp)
    }
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
    finalMessage = 'Unfortunately, you lost'
    finalMessageRevealWord = `... the word was: ${selectedWord}`
    playable = false
  }

  // make it impossible to play while the popup screen is on
  useEffect(() => setPlayable(playable))

  return (
    <div
      className='popup-container'
      style={finalMessage !== '' ? { display: 'flex' } : {}}
    >
      <div className='popup'>
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        {score > 0 ? <p>Your score is: {score}</p> : <p></p>}
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  )
}

export default Popup
