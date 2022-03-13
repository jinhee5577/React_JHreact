 /*eslint-disable*/ 
 import React, { Component, useEffect, useState, } from 'react';
 import { Navbar,Container,Nav,NavDropdown,Spinner  } from 'react-bootstrap';
 import './App.css';
 import Detail from './Detail.js';
 import Cart from './Cart.js';
 import Join from './Join.js';
 import Kakaomap from './Kakaomap.js';
 import Video from './Video.js';
 import Cinema from './Cinema.js';
 import Ticketing from './Ticketing.js';
 import axios from 'axios';
 import Slider from 'react-slick';
 import { useHistory } from 'react-router-dom';
 import { Link, Route, Switch } from 'react-router-dom';
 import { CSSTransition } from 'react-transition-group';
 import { useSelector, } from 'react-redux';
 import "slick-carousel/slick/slick.css";
 import "slick-carousel/slick/slick-theme.css";
 
 // const { kakao } = window;
 
 function App( {sliders} ) {
   let [products_mlb, Setproducts_mlb] = useState([]);   // main상품 data
   let [reference, Setreference] = useState([]);   // sub-menu탭 변경시 이용할 초기값.
   let history = useHistory();
   let [fail_m, fail_mchan] = useState(false);
   let [mobile, mobilechan] = useState(false);
   let [spinner, spinnerchan] = useState(false);
   let [MV_SPN, setMV_SPN] = useState(false);
   let [offsetyY, offsetyYchan] = useState(0);
   let [togglecon, toggleconchan] = useState(false);
   let [boxon, boxonchan] = useState(false);
   let [notice, noticechan] = useState(false);
   let [onvideo, setonvideo] = useState(false);
   let [jinmov, setjinmov] = useState([]);
   let [morebtn, Setmorebtn] = useState(1);
 
   // let dx_state = useSelector( (state) => { return state; } );
 
   let resent = localStorage.getItem('resent');
     if( resent == null ){
         resent = [];   
     } else { resent = JSON.parse(resent); }  
     
 
   useEffect( () => {              
          //  console.log(resent);

        let mob_timer = setTimeout( () => { 
                    console.log('a');                        
                    mobilechan(true);
        }, 700 );
      return () => { clearTimeout(mob_timer); } 
    }, [] );   
 
   useEffect( () => {
      window.addEventListener('scroll', () => {                    
                offsetyYchan( window.pageYOffset ); 
            //   console.log(window.pageYOffset);  
                
                if( offsetyY > 1900 ){         
               //   console.log('s');
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
   } );   
     
    let mov_async = async () => {
         const {data : { data }} = await axios.get('https://yts.mx/api/v2/list_movies.json?sort_by=like_count');
      //   console.log(data.movies);
         setjinmov(data.movies);
     }    
   
       
    let MLB = async () => {
         let {data : { products } } = await axios.get('https://raw.githubusercontent.com/jinhee5577/allData/master/product.json');       
         Setproducts_mlb(products);      
         Setreference(products);
     }     
 
    let sub_menu = (e) => {
         let attr = e.target.getAttribute('name');          
         let selct = reference.some((item) => {   // main 상품배열 쓰지말고, 참조용으로 만들어둔 reference초기값을 이용하자. (항상초기상품 갯수가 그데로이니.)
                       return item.type === attr;
                   });
         if(selct){  
         //   console.log(selct);                 
             let state_copy = [...reference];     //  마찬가지로 참조용으로 만들어둔 reference초기값을 이용하자. (항상초기상품 갯수가 그데로이니.)
             let mlb_filter = state_copy.filter((item) => {
                     return  item.type === attr;
               });        
             Setproducts_mlb(mlb_filter);
         } else {
             Setproducts_mlb(reference); 
         }
    } 
      
    let mv_menu = (e) => { 
          let attr = e.target.getAttribute('name');
          setMV_SPN(true);
          axios.get(`https://yts.mx/api/v2/list_movies.json?genre=${attr}&sort_by=year`)
          .then((res) => {
              let {data : {movies}} = res.data;
              setMV_SPN(false);
              setjinmov(movies);
        //    console.log(movies);
          })
          .catch((error) => { window.alert('정보를 받지 못했어요.'); });
    }
    
    let add_MLB = () => {      
         spinnerchan(true);
         Setmorebtn(morebtn + 1);
      //   console.log(morebtn);                                      
         axios.get( `https://raw.githubusercontent.com/jinhee5577/allData/master/product${morebtn + 1}.json` )
         .then((result) => {
               spinnerchan(false); 
           //    console.log(result.data.products2);
               Setproducts_mlb( [...products_mlb, ...result.data.products2 ] );   
               Setreference( [...reference, ...result.data.products2 ] );                                   
           })
         .catch(() => {
               spinnerchan(false); 
               console.log('없습니다.');
               fail_mchan(true);
           })                                      
     }     
 
   useEffect( () => { 
      mov_async();  
      MLB(); 
        // .then( (result) => { console.log(result); } )
        // .catch( () => { console.log('아직 기다려주세요.'); } )      
    }, [] );       
 
 
   return (
       <>
         {
           mobile === true
           ? <div className="mob_alert" >
               <h3 onClick={ () => { mobilechan(false); } } >
                 꼭 모바일로 봐주세요!. PC 일경우 width 400px 이하로 봐주세요.                             
                 <p>모바일에 가장 적합하게 제작 되었습니다.</p> 
               </h3>                    
             </div>
           : null   
         }
         <div className="App">
           <Navbar bg="light" expand="lg" className="navjin" >
               <Container id="cont" > 
                 <Navbar.Brand as={Link} style={ { color:'white' } } to='/'>JH VIP</Navbar.Brand>
                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
                 <Navbar.Collapse id="basic-navbar-nav">
                   <Nav className="me-auto">
                     <Nav.Link as={Link} to='/join' style={ { color:'white' } }>JOIN US</Nav.Link>
                     <Nav.Link as={Link} style={ { color:'white' } } to='/detail'>Dess</Nav.Link>
                     <NavDropdown title="Dropdown" id="basic-nav-dropdown" style={ { color:'white' } }>
                       <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                       <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                       <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                       <NavDropdown.Divider />
                       <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                     </NavDropdown>
                   </Nav>
                 </Navbar.Collapse>
               </Container>
           </Navbar>
           <CSSTransition className="page_ani" timeout={350} >
             <Switch>
                 <Route exact path="/">
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
                               let sort_copy = [...products_mlb];
                               sort_copy.sort( (a, b) => { return a.price - b.price; } );
                               Setproducts_mlb( sort_copy );                  
                         } } >가격순</button>
                       </h3>                  
                       <div className="cont2">
                           <div className="jinrow" >
                               {    
                                 products_mlb.map( (item, i ) => {
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
                         <div id="tourbox" className={ boxon ? 'onbox': '' }>                      
                           <div className="korea_j">
                             <h3 className="youph">JINHEE CINEMA</h3>    
                             <ul id="sub_menu" className='mv_menu'>
                                <li><button name="Drama" onClick={mv_menu} >인기</button></li>
                                <li><button name="action" onClick={mv_menu} >액션</button></li>
                                <li><button name="comedy" onClick={mv_menu}>코메디</button></li>
                                <li><button name="Fantasy" onClick={mv_menu}>판타지</button></li>                    
                             </ul>
                             <section>
                               <Slider {...settings2} width="100%">                           
                                  { 
                                      jinmov.map( (item, i) => { 
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
                               { MV_SPN ? <Spinner animation="grow" variant="info" className="Mv_spn" /> : null }
                             </section>
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
                 </Route>
 
                 <Route path="/detail/:id">
                   <Detail products_mlb={ products_mlb } noticechan={noticechan} />
                 </Route>
 
                 <Route path="/cart">
                   <Cart notice={notice} />            
                 </Route>
 
                 <Route path="/join">
                   <Join />            
                 </Route>
 
                 <Route path="/cinema/:mm">
                   <Cinema jinmov={jinmov} />   
                 </Route>
 
                 <Route path="/ticketing">
                   <Ticketing />   
                 </Route>
             </Switch>       
           </ CSSTransition >        
                   
           <div className="resent">
             <h6 onClick={ () => { localStorage.removeItem('resent'); } }>resent</h6>
             <article>
               {
                   resent.map( (img, i) => { 
                         return (
                             <div className="re_0" key={i}>
                               {/* <img src={'https://codingapple1.github.io/shop/shoes' + (Number(num) + 1) + '.jpg'} /> */}
                               <img src={img}  alt="제품"/>
                             </div>   
                         );   
                   } )
               }                    
             </article>         
           </div>        
         </div>
       </>  
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
         <div id="cont3" className={ props.togglecon ? 'on3': '' } >
            
         </div>
      );
 }
  
 
 export default App;
 
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
 