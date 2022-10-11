 /*eslint-disable*/ 
 import React, { Component, useEffect, useState, useRef } from 'react';
 import { Spinner } from 'react-bootstrap';
 import './App.css'; 
 import Kakaomap from './Kakaomap.js';
 import Video from './Video.js';
 import axios from 'axios';
 import Slider from 'react-slick';
 import { useHistory } from 'react-router-dom'; 
 import { useSelector, } from 'react-redux';
 import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";

 // Home 컴포넌트르 따로 만들어 빼서 App컴포넌트를 간결하게 만들어줄려구 하였으나, 비동기 로 받아온 상품데이터와, 영화목록 데이터들
 // 에서 컴포넌트가 unmount 될시 Warning이 발생하여 계속 수정을 하였지만, 수정이 아직되질않아 나중에 다시 작업을 해야겠다.
 // 트리거변수와 useEffect의 cleanup function을 이용해하였지만 아직 미해결.
 // 경고! 언마운티드된 컴포넌트에 대해서는 상태 업데이트를 수행할 수 없다.
 // 해당 작업은 수행되지 않지만 메모리 누수가 발생된다.  
 
 function Home( props ){
    let [offsetyY, offsetyYchan] = useState(0);
    let history = useHistory();
    let [fail_m, fail_mchan] = useState(false);
    let [spinner, spinnerchan] = useState(false);  
    let [togglecon, toggleconchan] = useState(false);
    let [boxon, boxonchan] = useState(false);
    let [onvideo, setonvideo] = useState(false);
    let [morebtn, Setmorebtn] = useState(1);  
    let isMount = useRef(false);     

    useEffect( () => {
        window.addEventListener('scroll', () => {                    
               offsetyYchan( window.pageYOffset ); 
            //   console.log(window.pageYOffset);  
               
               if( offsetyY > 1000 ){
                // console.log('d');
                   toggleconchan(true);
                   let boxtime = setTimeout( () => { 
                               //  console.log('y');
                                 boxonchan(true);   
                    }, 600 );                       
               }
         } );
        return () => { window.removeEventListener('scroll', () => {
                    offsetyYchan(window.pageYOffset);
                    clearTimeout(boxtime);
            } ) }       
     }, );  

     let sub_menu = (e) => {
        let attr = e.target.getAttribute('name');          
        let selct = props.reference.some((item) => {   // main 상품배열 쓰지말고, 참조용으로 만들어둔 reference초기값을 이용하자. (항상초기상품 갯수가 그데로이니.)
                        return item.type === attr;
                    });
        if(selct){  
        //   console.log(selct);                 
            let state_copy = [...props.reference];     //  마찬가지로 참조용으로 만들어둔 reference초기값을 이용하자. (항상초기상품 갯수가 그데로이니.)
            let mlb_filter = state_copy.filter((item) => {
                        return  item.type === attr;
                });        
            props.Setproducts_mlb(mlb_filter);
        } else {
            props.Setproducts_mlb(props.reference); 
        }
     }   

     let add_MLB = () => {      
            spinnerchan(true);
            Setmorebtn(morebtn + 1);
        //   console.log(morebtn);                                      
            axios.get( `https://raw.githubusercontent.com/jinhee5577/allData/master/product${morebtn + 1}.json` )
            .then((result) => {
                spinnerchan(false); 
                isMount.current = true;
                if(isMount.current){
                    //    console.log(result.data.products2);
                    props.Setproducts_mlb( [...props.products_mlb, ...result.data.products2 ] );   
                    props.Setreference( [...props.reference, ...result.data.products2 ] );     
                }                                            
            })
            .catch(() => {
                spinnerchan(false); 
                console.log('없습니다.');
                fail_mchan(true);
            })                                      
        }     

     useEffect(() => { 

        return () => { isMount.current = false; };
     }, []);


     return (
        <div id="jinwrap">
           <Slider {...settings} width="100%">
                <div className="bacground bg0">                                
                </div>
                <div className="bacground bg1">                   
                    <h3>20%  Season  OFF!</h3>
                </div>
                <div className="bacground bg2">                    
                    <h3>20%  Season  OFF!</h3>
                </div>
                <div className="bacground bg3">                  
                    <h3>20%  Season  OFF!</h3>
                </div>
                <div className="bacground bg4">                   
                    <h3>20%  Season  OFF!</h3>
                </div>
           </Slider>  
           <ul id="sub_menu">
            <li><button name="new" onClick={sub_menu} >NEW</button></li>
            <li><button name="top" onClick={sub_menu} >TOP</button></li>
            <li><button name="cap" onClick={sub_menu}>CAP</button></li>
            <li><button name="shoes" onClick={sub_menu}>SHOES</button></li>                    
           </ul> 

           <h3 className="new"> 이번주 신상품 
            <button className="sort_b" onClick={ () => {
                    let sort_copy = [...props.products_mlb];
                    sort_copy.sort( (a, b) => { return a.price - b.price; } );
                    props.Setproducts_mlb( sort_copy );                  
            } } >가격순</button>
           </h3>                  
           <div className="cont2">
                <div className="jinrow" >
                    {    
                      props.products_mlb.map( (item, i ) => {
                            return <Card item={item} i={ i } key={i} history={ history } />;
                       } )
                    }             

                    { fail_m ? <h3 className="fail">더는 상품이 없습니다.</h3> : null }
                    { spinner ? <Spinner animation="grow" variant="warning" className="spinner_j" /> : null }
                    <button className="more" onClick={add_MLB} >더보기</button>                                        
                </div>
           </div>                        
           <div id="jinhee">
            <Cont3 togglecon={togglecon} />
            <Cont3 togglecon={togglecon} />
            <div id="tourbox" className={ boxon === true ? 'onbox': ''  }>                      
                <div className="korea_j">
                <h3 className="youph">JINHEE CINEMA</h3>    
                <Slider {...settings2} width="100%">                           
                    {
                      props.jinmov.map( (item, i) => { 
                           return(
                              <div className="artbox" key={i} onClick={ () => { history.push('/cinema/' + item.id); } } >
                                 <div className="artimg">
                                    <img src={item.medium_cover_image}/> 
                                    <strong>{i + 1}</strong>                                             
                                 </div>
                                 <div className="mv_con">
                                    <h5>{item.title}</h5>
                                    <h6>⭐ {item.rating}</h6>
                                    <h4>예매하기</h4>
                                 </div>                                          
                              </div>
                          );   
                      } ) 
                    }                             
                </ Slider> 
                <button className="vid_but" onClick={ () => {setonvideo(true);} } >홍보영상</button>                               
                </div>                      
            </div>       
           </div>                                
           <Kakaomap />
           { onvideo ? <Video setonvideo={setonvideo} /> : null }                     
           <footer>
            <div className="custom-shape-divider-bottom-1637663460">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div> 
            <h4>제작 : OH JIN HEE</h4>                    
           </footer>      
        </div>          
     );
 }

 
function Card( props ){
    let [new_color, setnew_color] = useState([]);

    useEffect(() => {
          let color_copy = [...props.item.option.color];
          color_copy.shift();
          setnew_color(color_copy);
     }, []);
     
    return(
        <div className="mlb_col" onClick={ () => { props.history.push('/detail/' + props.item.id ); } } >    
            <img src={ props.item.img } width="95%" />
            <div className="square">
              <h4>{ props.item.title }</h4>
              <article>
                <p>{ props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }원</p>
                <ul>
                  {              
                    new_color.map((c, i) => {
                          return  <li style={{ background : c }} key={i}></li>;
                     })
                  }                
                </ul>
              </article>             
            </div>
        </div>
      );
  }

function Cont3( props ){
    return(
        <div id="cont3" className={ props.togglecon === true ? 'on3': '' } >
           
        </div>
     );
}
 
 
 export default Home;


 const settings = {
        arrows: false,
        dots: true,  // 슬라이드 밑에 점 보이게
        infinite: true,  // 무한으로 반복
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,  // 넘어가는 속도
        slidesToShow: 1,  // 4장씩 보이게
        slidesToScroll: 1,  // 1장씩 뒤로 넘어가게
        centerMode: true,
        centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
  };

const settings2 = {
        arrows: false,
        dots: false,  // 슬라이드 밑에 점 보이게
        infinite: false,  // 무한으로 반복
        speed: 50,
        autoplay: false,
    //    autoplaySpeed: 2500,  // 넘어가는 속도
        slidesToShow: 2,  // 4장씩 보이게
        slidesToScroll: 2,  // 2장씩 뒤로 넘어가게
        centerMode: false,
        centerPadding: '0px',  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
  };  