import React from 'react';




const Scoreboard = ({score}) => {
    return (
        <div className='score-board'>
            <h2> Yay! Your score is: {score}</h2>
        </div>
    );
}

export default Scoreboard;