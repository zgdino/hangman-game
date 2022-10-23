export function showNotification(setter) {
 setter(true)
 setTimeout(() => {
  setter(false)
 }, 2000)
}

export function checkWin(correct, wrong, word) {
 let status = 'win'

 // remove non-letters
 let newWord = word.replace(/[^a-z]/g, '')

 // check for win
 newWord.split('').forEach(letter => {
  if (!correct.includes(letter)){
   // it does not mean we lost or win
   status = ''
  }
 })

 // check for lose
 if (wrong.length === 6) status = 'lose'

 return status
}