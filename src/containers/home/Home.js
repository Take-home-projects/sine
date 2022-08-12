import React from 'react';
import CandyCrush from '../candyCrush/CandyCrush';
import Sine from '../sine/Sine';
import './home.css'


function Home() {
    return (
        <div className='home'>
            <div className='homeTop'>
                <h3>Home of Katrina Dierking!</h3>
                <h3>Gaze into my beautiful sine.</h3>
                <Sine />
                <h5>(10 points if you can correctly identify the reference.)</h5>
            </div>
        
            <div className='candy'>
                <div className='homeMiddle'>
                        <h4> Enjoy a game of Candy Crush ... but don't get addicted. There's no 12-step program for that ...yet</h4>
                        <h5> Drag the candies to rows of 3 and 4 to eliminate them.</h5>
                </div>
                <CandyCrush />
            </div>
        </div>
        
    );
}

export default Home;