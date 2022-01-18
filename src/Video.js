 /*eslint-disable*/ 
 import React, { Component, useState, useEffect, useRef } from 'react';
 import './App.css';
 import axios from 'axios';
//  import disney from './aesset/disney_YouTube.mp4';


function Video ( props ){
    let video_jin = useRef();
    let dokev_h = useRef();
    
    useEffect( () => { 
        video_jin.current.classList.toggle('main_video2'); 
        let timedokev = setTimeout(() => {
                   dokev_h.current.style.opacity = 1;   
          }, 6000);

      //  console.log('l');
        const colors = ["#478ae2", "#a341ca"];
        const numBalls = 30;
        const balls = [];

        for (let i = 0; i < numBalls; i++) {
          let ball = document.createElement("div");
          ball.classList.add("ball");
          ball.style.background = colors[Math.floor(Math.random() * colors.length)];
          ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
          ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
          ball.style.transform = `scale(${Math.random()})`;
          ball.style.width = `${Math.random()}em`;
          ball.style.height = ball.style.width;
      
          balls.push(ball);
          video_jin.current.append(ball);
        }

        // Keyframes
        balls.forEach((el, i, ra) => {
                let to = {
                            x: Math.random() * (i % 2 === 0 ? -11 : 11),
                            y: Math.random() * 12
                        };

                let anim = el.animate(
                  [{ transform: "translate(0, 0)" },
                  { transform: `translate(${to.x}rem, ${to.y}rem)` }],
                    {
                      duration: (Math.random() + 1) * 2000, // random duration
                      direction: "alternate",
                      fill: "both",
                      iterations: Infinity,
                      easing: "ease-in-out"
                    }
                );                  
           });                

        return () => { clearTimeout(timedokev); }
     }, [] );    

    return(
        <div id="main_video" ref={video_jin} >                     
           <h4>PEARLABYSS</h4>         
           <iframe height="315" src="https://www.youtube.com/embed/xkELKW1waos?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            {/* <video autoPlay loop={true} muted={true} controls >
              <source src=""></source> 
            </video>   */}
           <h5 onClick={ () => { props.setonvideo(false); } } >X</h5>
           <ul className="do_light" ref={dokev_h} >
              <li></li>
              <li></li>
              <li></li>
              <li className='gre1'></li>
              <li className='gre1'></li>
              <li className='gre1'></li>             
           </ul>  
        </div>
    );
}

export default Video;  