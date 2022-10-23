import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Figure from './components/Figure'
import WrongLetters from './components/WrongLeters'
import Word from './components/Word'
import Name from './components/Name'
import Popup from './components/Popup'
import Notification from './components/Notification'
import { showNotification as show } from './helpers/helpers'
import axios from 'axios'

import './App.css'

function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [quote, setQuote] = useState('dino')
  const [userName, setUserName] = useState('')
  const [quoteID, setQuoteID] = useState(0)
  const [quoteLength, setQuoteLength] = useState(0)
  const [uniqueChar, setUniqueChar] = useState(0)
  const [duration, setDuration] = useState(0)
  const [highScore, setHighScore] = useState([])

  // fetch the quote data
  const getQuote = () => {
    axios
      .get('https://api.quotable.io/random')
      .then(async (res) => {
        setQuote(res.data.content.toLowerCase())
        setQuoteID(res.data._id)
        setQuoteLength(res.data.length)
        setUniqueChar(new Set(res.data.content).size)
        // hard coding the duration for now → will deal with it later
        setDuration(Math.trunc(949500 / new Set(res.data.content).size))
      })
      .catch((err) => {
        console.log(err)
      })
    setCorrectLetters([])
    setWrongLetters([])
  }

  let selectedWord = quote

  // GET High scores - not clear for now(getting multiple requests for some reason - try async function)

  useEffect( () => {
     axios
      .get(
        'https://my-json-server.typicode.com/Serapion-ZG/hangman-ts/highscores'
      )
      .then((res) => {
        let tableFinal = res.data.map(
           ({ id, quoteId, length, uniqueCharacters, duration, ...item }) => ({
            ...item,
          })
        )
        // console.log('NEW TABLE')
        // console.log(tableFinal)
       setHighScore([...tableFinal])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log('↓HIGHSCORE↓')
  console.log(highScore)

  // keyboard letters sensitivity
  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase()
        // if the letter we pressed is part of the selected word and it is not part of correctLetters array, add it to it
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter])
          } else {
            // show notification that this letter has been pressed already
            show(setShowNotification)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter])
          } else {
            show(setShowNotification)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeydown)
    // remove event listener
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [correctLetters, wrongLetters, playable])

  const playAgain = () => {
    setPlayable(true)

    // Empty arrays
    setCorrectLetters([])
    setWrongLetters([])

    // give new quote
    getQuote()
  }

  return (
    <>
      <Header />
      <p className='errors'>{wrongLetters.length} / 6 errors</p>
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <button onClick={getQuote}>Restart</button>
      </div>
      <p>QUOTE: {selectedWord}</p>
      <p>Quote ID: {quoteID}</p>
      <p>Quote length: {quoteLength}</p>
      <p>Unique chars: {uniqueChar}</p>
      <p>user name: {userName}</p>
      <p>errors: {wrongLetters.length}</p>
      <Notification showNotification={showNotification} />
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
        quoteID={quoteID}
        quoteLength={quoteLength}
        uniqueChar={uniqueChar}
        userName={userName}
        duration={duration}
        highScore={highScore}
      />
      <Name
        playAgain={playAgain}
        setPlayable={setPlayable}
        setUserName={setUserName}
        getQuote={getQuote}
      />
    </>
  )
}

export default App
