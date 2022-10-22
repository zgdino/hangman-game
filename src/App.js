import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Figure from './components/Figure'
import WrongLetters from './components/WrongLeters'
import Word from './components/Word'
import Popup from './components/Popup'
import Notification from './components/Notification'
import { showNotification as show } from './helpers/helpers'

import './App.css'

const words = ['application', 'programming', 'interface', 'wizard']

let selectedWord = words[Math.floor(Math.random() * words.length)]

function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)

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

    const random = Math.floor(Math.random() * words.length)
    selectedWord = words[random]
  }

  return (
    <>
      <Header />
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification} />
    </>
  )
}

export default App
