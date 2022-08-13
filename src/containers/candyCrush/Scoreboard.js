import React from 'react';




const Scoreboard = ({score}) => {
    return (
        <div className='score-board'>
            <h2> Yay! Your score is: <span className='score'>{score}</span></h2>
        </div>
    );
}

export default Scoreboard;