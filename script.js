const LS_NAME = 'coinFlipScores'
const SCORE_SLOTS = 5
let score = 0
document.addEventListener('DOMContentLoaded', () => {
    updateScores()
    document.getElementById('play').addEventListener('click', playGame)
    document.getElementById('reset').addEventListener('click', resetGame)
})
const resetGame = () => {
    // Re-hide the reset game button
    document.getElementById('reset').style.display = 'none'
    // Reset the score
    score = 0
    // Turn the text blue again
    document.getElementById('result-text').style.color = 'skyblue'
    // Hide result div
    document.getElementById('result').style.visibility = 'hidden'
    // Display the controls div
    document.getElementById('controls').style.visibility = 'visible'
}
const playGame = () => {
    // Check and make sure a radio button is clicked
    let checked = document.getElementsByName('choice')[0].checked ? 'heads' : 'tails'
    console.log('You selected', checked)
    // Random generator function for flips
    let flip = randomGenerator()
    console.log('Actual flip was', flip)
    // Determine the outcome of the game
    if (flip === checked) {
        console.log('WIN')
        score++
        winGame(flip)
    }
    else {
        loseGame(flip)
        console.log('LOSE, your score was', score)
    }
}
const randomGenerator = () => {
    return Math.random() > 0.5 ? 'heads' : 'tails'
}
const showGameResult = (flip) => {
    // Determine which image to show
    let imgSrc = 'https://res.cloudinary.com/briezh/image/upload/v1585328577/penny-heads_wfbf3k.jpg'
    if (flip === 'tails') {
        imgSrc = 'https://res.cloudinary.com/briezh/image/upload/v1585328577/penny-tails_qdcnyx.jpg'
    }
    // Ensure that the result div is visible
    document.getElementById('result').style.visibility = 'visible'
    // Display the image
    document.getElementById('result-img').src = imgSrc
}
const winGame = (flip) => {
    showGameResult(flip)
    document.getElementById('result-text').textContent = 'WINNER! Score: ' + score
}
const loseGame = (flip) => {
    // Show the penny image and result div
    showGameResult(flip)
    // Turn the text red if we lose
    document.getElementById('result-text').style.color = 'crimson'
    // Show a lose message
    document.getElementById('result-text').textContent = 'YOU LOSE! Score: ' + score
    // Stop the game by hiding the controls
    document.getElementById('controls').style.visibility = 'hidden'
    // Get a name/initials for high score
    let name = prompt('Great score! Record your initials!')
    // Tally the high score
    addHighScore(name)
    // Update the high score
    updateScores()
    // Show the reset game button
    document.getElementById('reset').style.display = 'inline-block'
}
// Record name + score in localStorage
const addHighScore = (name) => {
    // Grab the scores out of localStorage (this is an array)
    let scores = getHighScores()
    // Add to the scores array
    scores.push({ name: name, score: score })
    // Sort the scores in order by the score property
    // SORT:
    // ArrayInstance.sort(comparisonFunction)
    // comparisonFunction: function that compares two elements within the array
    // and returns an order for them
    scores.sort((a, b) => {
        return b.score - a.score
    })
    // Limit the number of scores to the top X number of SCORE_SLOTS
    // SLICE: start index, stop index RETURNS: Subset of array (copy)
    scores = scores.slice(0, SCORE_SLOTS)
    // Turn the data into a string
    let stringData = JSON.stringify(scores)
    // Write it back to localStorage
    localStorage.setItem(LS_NAME, stringData)
}
const getHighScores = () => {
    // Go into localStorage, fetch the high scores, turn them into JS objects
    let stringScores = localStorage.getItem(LS_NAME)
    // If there was nothing in LS, just assume empty
    if (!stringScores) {
        return []
    }
    // Turn the string data back into an array
    let arrayOfScores = JSON.parse(stringScores)
    // Return it, conveniently as an array
    return arrayOfScores
}
const updateScores = () => {
    // Empty the table
    document.getElementById('table-body').innerHTML = ''
    // Grab the scores out of localStorage
    let scores = getHighScores()
    // Loop through the scores, put each score in a score table
    for (let i = 0; i < scores.length; i++) {
        // Create some new elements
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdScore = document.createElement('td')
        // Set the text of the new elements
        tdName.textContent = scores[i].name
        tdScore.textContent = scores[i].score
        // Set the new elements into the DOM
        tr.append(tdName)
        tr.append(tdScore)
        document.getElementById('table-body').append(tr)
    }
}