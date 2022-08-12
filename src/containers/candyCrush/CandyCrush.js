
import React, {useState, useEffect} from 'react';
import './index.css'

import Scoreboard from './Scoreboard';
import blueCandy from './assets/blue-candy.png'
import greenCandy from './assets/green-candy.png'
import redCandy from './assets/red-candy.png'
import yellowCandy from './assets/yellow-candy.png'
import coffeeCandy from './assets/coffee-candy.png'
import purpleCandy from './assets/purple-candy.png'
import blank from './assets/blank.png'

const width = 8; 
const candyColors = [
 blueCandy, 
 greenCandy,
 redCandy,
 yellowCandy,
 coffeeCandy,
 purpleCandy,
 blank
]
const CandyCrush = () => {


    const [currentColorGroup, setCurrentColorGroup] = useState([])
    const [squareDragged, setSquareDragged] = useState(null)
    const [squareReplaced, setSquareReplaced] = useState(null)
    const [scoreDisplay, setScoreDisplay] = useState(0)
    //checks
    
    const checkForColOfFour= () => {
        for(let i = 0; i <= 39; i++) {
            const colOfFour = [i, i + width, i + width * 2, i + width * 3]
            const chosenColor = currentColorGroup[i]
            const isBlank = currentColorGroup[i] === blank

            if(colOfFour.every(square => currentColorGroup[square] === chosenColor && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                colOfFour.forEach(square => currentColorGroup[square] = blank)
                return true
            }
        }
    }

    const checkForRowOfFour= () => {
        for(let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const chosenColor = currentColorGroup[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isBlank = currentColorGroup[i] === blank

            if (notValid.includes(i)) continue

            if(rowOfFour.every(square => currentColorGroup[square] === chosenColor && !isBlank)) {
                setScoreDisplay((score) => score + 4)
                rowOfFour.forEach(square => currentColorGroup[square] = blank)
                return true
            }
        }
    }

    const checkForColOfThree= () => {
        for(let i = 0; i <= 47; i++) {
            const colOfThree = [i, i + width, i + width * 2]
            const chosenColor = currentColorGroup[i]

            if(colOfThree.every(square => currentColorGroup[square] === chosenColor)) {
                setScoreDisplay((score) => score + 3)
                colOfThree.forEach(square => currentColorGroup[square] = blank)
                return true
            }
        }
    }

        
    
    const checkForRowOfThree= () => {
        for(let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const chosenColor = currentColorGroup[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isBlank = currentColorGroup[i] === blank

            if (notValid.includes(i)) continue

            if(rowOfThree.every(square => currentColorGroup[square] === chosenColor && !isBlank)) {
                setScoreDisplay((score) => score + 3)
                rowOfThree.forEach(square => currentColorGroup[square] = blank)
                return true
            }
        }
    }

    const moveBelow = () => {
        for(let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if(isFirstRow && currentColorGroup[i] === blank) {
               let randomNum = Math.floor(Math.random() * candyColors.length)
               currentColorGroup[i] = candyColors[randomNum]
            }
            if((currentColorGroup[i + width]) === blank) {
                currentColorGroup[i + width] = currentColorGroup[i]
                currentColorGroup[i] = blank
            }
        }
    }

    const dragStart = (e) => {
        setSquareDragged(e.target)
    }
    const dragDrop = (e) => {
        setSquareReplaced(e.target)
    }
    const dragEnd = () => {
       const squareDraggedId = parseInt(squareDragged.getAttribute('data-id'))
       const squareReplacedId = parseInt(squareReplaced.getAttribute('data-id'))

       currentColorGroup[squareReplacedId] = squareDragged.getAttribute('src')
       currentColorGroup[squareDraggedId] = squareReplaced.getAttribute('src')

       const validMoves = [
        squareDraggedId -1, 
        squareDraggedId - width, 
        squareDraggedId + 1, 
        squareDraggedId + width
       ]

       const validMove = validMoves.includes(squareReplacedId)

       const isColOfFour = checkForColOfFour()
       const isRowOfFour = checkForRowOfFour()
       const isColOfThree = checkForColOfThree()
       const isRowOfThree = checkForRowOfThree()

       if (squareReplacedId && 
        validMove && 
        (isRowOfThree || isRowOfFour || isColOfThree || isColOfFour)) {
            setSquareDragged(null)
            setSquareReplaced(null)
        } else {
            currentColorGroup[squareReplacedId] = squareReplaced.getAttribute('src')
            currentColorGroup[squareDraggedId] = squareDragged.getAttribute('src')
            setCurrentColorGroup([...currentColorGroup])
        }
    }
    const createBoard = () => {
        const candyArrangement = []
        for (let i = 0; i < width * width; i++) {
            const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
            candyArrangement.push(randomColor)

        }
        setCurrentColorGroup(candyArrangement)
    }

    // useEffects 
    useEffect(() => {
        createBoard()
    }, [])


    useEffect(() => {
        const timer = setInterval(() => {
            checkForColOfFour()
            checkForRowOfFour()
            checkForColOfThree()
            checkForRowOfThree()
            moveBelow()
            setCurrentColorGroup([...currentColorGroup])
        }, 100)
        return () => clearInterval (timer)
    }, [checkForColOfFour, checkForRowOfFour, checkForColOfThree, checkForRowOfThree, moveBelow, currentColorGroup])

    return (
        <>
        <Scoreboard score ={scoreDisplay}/>

        <div className = "candyCrushBody">
            <div className = "game">
                {currentColorGroup.map((candyColor, index) => (
                    <img   
                        key={index}
                        src={candyColor}
                        alt={candyColor}
                        data-id={index}
                        draggable={true}
                        onDragStart={dragStart}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragLeave={(e) => e.preventDefault()}
                        onDrop={dragDrop}
                        onDragEnd={dragEnd}
                    />
                    
                ))}
            </div>
           
        </div>
        </>
    );
}

export default CandyCrush;