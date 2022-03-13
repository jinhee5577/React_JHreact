 /*eslint-disable*/ 
 import React, { Component, useState, useEffect, useRef } from 'react';
 import './App.css';
 import { useHistory, useParams } from 'react-router-dom';
 import { useSelector, useDispatch } from 'react-redux';
//  import DatePicker from "react-datepicker";
 import Slider from 'react-slick';
 import "react-datepicker/dist/react-datepicker.css";
 import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";

 
 function Ticketing ( {sliders} ){
    const [startDate, setStartDate] = useState(new Date());
    let [haveto, sethaveto] = useState(false);    
    let state = useSelector( (store) => { return store.cinema; } );
    let vipcinema = useSelector( (store) => { return store.premium } );
    let dispatch = useDispatch();
    let after_h = useRef();
    let after_h2 = useRef();

    let date = new Date();
    let pickday = date.getDay();
     //   date.setDate(28);    
    let lastedate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let this_lastedate = lastedate.getDate();
  //   console.log(this_lastedate + 1); 

    let alldate = [];
    let weekday = ['일','월','화','수','목','금','토'];
    let d = 1;
   
    for(let i = 0;  i < 14;  i++ ){
         if( date.getDate() + i < this_lastedate + 1 ){
            alldate.push( date.getDate() + i );   
        //    console.log(i);            
          } else {      
         //  date.setDate(1);   날짜를 1로 초기화를 시키면 다시 첫번째 if문이 실행되어버린다.
         //  console.log(date.getDate());  
         //   console.log(alldate);          
            alldate.push(d); 
            d++;            
         //   console.log(d);           
          }         
        }        
        
     let jinh3 = document.querySelectorAll('.jinh3');  
     let change_d = document.querySelector('.change_d');
     let yoil = document.querySelector('.yoil');
     let cinema_time = document.querySelectorAll('.cinema_time');
      //  console.log(jinh3);           
       
    useEffect( () => {        
       let jinh3 = document.querySelectorAll('.jinh3'); 
       let change_d = document.querySelector('.change_d');
       let yoil = document.querySelector('.yoil');
          jinh3[0].classList.add('we_da');
          change_d.innerText = alldate[0];     
          yoil.innerText = weekday[date.getDay()];
    }, []); 
  //    console.log(alldate);

    return (
       <div className="ticketing">
         <div className='ti_box'></div>  
         <div className="custom-shape-divider-top-1640756594">
           <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
           </svg>
         </div>
         {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
         <div id="week_calendar">
            <h4>{date.getFullYear()}<span>년</span> {date.getMonth() + 1}<span>월</span></h4>
            <div className='pick_calendar'>
               <Slider {...settings} width="100%">
                  {                   
                     alldate.map( (date, i) => { 
                        //   console.log((pickday + i) % 7);
                           return (
                              <div className='date_box' key={i}>
                                <h3 className='jinh3' data={i} onClick={ (e) => {
                                    jinh3.forEach( (ele) => { ele.classList.remove('we_da'); } );     
                                    let ev = e.target.getAttribute('data');                                                                                                                           
                                    if(ev == i){
                                       jinh3[ev].classList.add('we_da');
                                       change_d.innerText = date;
                                       yoil.innerText = weekday[(pickday + i) % 7];                                  
                                    }    
                                 } }>{date}</h3> 
                                <h6 >{weekday[(pickday + i) % 7]}</h6>
                              </div>   
                           );
                     } )
                  }   
               </Slider>                           
            </div>       
            <div className='show_ticket' >
               <article>
                 <div className='mv_img' >
                    <img src={state.medium_cover_image} width="100%" />
                 </div>    
                 <span>{state.title}</span>
               </article>        
               <h3 className='d4'>PREMIUM 관</h3>      
               <div className='vipcinema'>                
                 <section>
                   {
                     vipcinema.map( (item, i) => { 
                           return (
                              <div className='cinema_time' data={i} key={i} onClick={(e) => { 
                                   let t1 = document.querySelector('.t1'); 
                                   let t2 = document.querySelector('.t2'); 
                                   let v_set = document.querySelector('.v_set'); 
                                   let data = e.target.getAttribute('data');                                 
                                  //   console.log(data);
                                       t1.innerHTML = item.time[0];  
                                       t2.innerHTML = item.time[1];                                      
                                       dispatch({ type : 'v', i : i, haveto : haveto, }); 
                                       if( item.set >= 0 ){
                                          v_set.innerText = item.vip;   
                                       }                                                        
                                }} >
                                <h3><strong><span>{item.time[0]}</span> ~ {item.time[1]}</strong></h3>    
                                <h5><span>{item.set}</span>/23</h5>  
                              </div>
                           );
                     } )
                   }
                 </section>    
               </div> 
               <div className='auto_ticket'>
                 <h4 className='j4'>JINHEE CINEMA PREMIUM</h4>
                 <div className='bigsection'>
                   <section>
                     <h5>영화 : <span>{state.title}</span></h5>
                     <h5>Date : <span>{date.getFullYear()}년 {date.getMonth() + 1}월 <span className='change_d' ></span>일 (<span className='yoil'></span>)</span></h5>
                     <h5>시간 : <span className='t1'></span> ~ <span className='t2'></span></h5>
                   </section>  
                   <section>
                     <h5>runtime : <span>{state.runtime}분</span></h5>
                     <h5>VIP :  <span className='v_set' >0</span>분</h5>
                   </section>
                 </div>            
               </div>
            </div>       
         </div>         
       </div>
    );
 }


 export default Ticketing;


 const settings = {
   arrows: false,
   dots: false,  // 슬라이드 밑에 점 보이게
   infinite: false,  // 무한으로 반복
   speed: 40,
   autoplay: false,
//   autoplaySpeed: 2500,  // 넘어가는 속도
   slidesToShow: 7,  // 7장씩 보이게
   slidesToScroll: 3,  // 1장씩 뒤로 넘어가게
   centerMode: false,
   centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
 };