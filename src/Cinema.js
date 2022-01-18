 /*eslint-disable*/ 
 import React, { Component, useState, useEffect } from 'react';
 import './App.css';
 import { useHistory, useParams } from 'react-router-dom';
 import { Link, Route, Switch } from 'react-router-dom';
 import { useSelector, useDispatch } from 'react-redux';


 function Cinema( props ){
    let { mm } = useParams();
    let history = useHistory();
    let dispatch = useDispatch();
    let findmove = props.jinmov.find( (m) => { return m.id == mm; } );
    let movindex = props.jinmov.findIndex( (m) => { return m.id == mm; } );  

     return(
        <div className="cinema_wrap">
           <h2 className="uptitle">{findmove.title}</h2>
           <div className="cine_back">
              <img src={findmove.large_cover_image} />               
           </div> 
           <div className="cinema_info">             
             <article>
                <h3>{findmove.title}</h3>
                <h4>{findmove.genres[0]}, {findmove.genres[2]}/ 미국</h4>
                <h4>{findmove.year} 개봉 <span className="mv_t">🧭 {findmove.runtime}분</span></h4>
             </article>
             <div className="small_img">
                 <img src={findmove.medium_cover_image} /> 
             </div>
           </div>
           <div className="synopsis">
              <h4>시놉시스</h4>
              <p>"{findmove.synopsis}"</p> 
           </div>  
           <div className="cine_middle"> 
             <ul>
                <li>
                   <h5>관람객평점</h5>
                   <p><span className="sp1">⭐</span>{findmove.rating}</p>
                </li>
                <li>
                   <h5>인기순위</h5>
                   <p>{movindex + 1}<span className="sp2">위</span></p>
                </li>
                <li>
                   <button onClick={ () => { 
                           history.push('/ticketing'); 
                           dispatch({ type : 'cinema', payload : findmove, });
                     } } >예매하기</button>
                </li>
             </ul>            
           </div>    
        </div>
     );  
 }
                                  

export default Cinema; 