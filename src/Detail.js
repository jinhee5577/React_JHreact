 /*eslint-disable*/ 
import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { useHistory, useParams } from 'react-router-dom';
import { Nav, } from 'react-bootstrap';
import { CSSTransition, } from 'react-transition-group';
import { connect, } from 'react-redux';


function Detail( props ){
      let history = useHistory();  //  이제 history 라는 변수엔 큰 object {} 자료가 하나 저장이 되어있습니다.
                                   //  그 object 안에는 페이지 이동 내역 + 유용한 함수가 저장되어있습니다.
      let { id } = useParams();                           
      let [show, showchan] = useState(false);
      let [hart, hartchan] = useState(0);       
      let [tabnum, tabnumchan] = useState(0);
      let [csstrn, csstrnchan] = useState(false);
      let [color_selec, setcolor_selec] = useState('');
      let [size_selec, setsize_selec] = useState(0);
       
      let find = props.products_mlb.find( (item) => { 
                        return item.id == id;           
                  } );     
      find['qunn'] = 1;
      find['select'] = [color_selec, size_selec];
    
      let [alert, alertchan] = useState( true );                      
         
      useEffect( () => {                                       
             let timer = setTimeout( () => { alertchan(false) } , 2000 );
          //   console.log('hi');
             return () => { clearTimeout(timer); }
            }, [] );
            
      useEffect( () => { 
          let resent = localStorage.getItem('resent');
              if( resent == null ){
                  resent = [];   
              } else { resent = JSON.parse(resent); }       

              if( resent.length < 3 ){ resent.push(find.img); } 
              resent = new Set(resent);
              resent = [...resent];             
            //  console.log(resent);
              props.dispatch({ type : 'resent', payload : resent });
              localStorage.setItem('resent', JSON.stringify(resent));
         }, [] );    
  
     function hartplus (){ hartchan( hart + 1 ); }
            
      return(
         <div className="container nct_j">
            <div className="row">
                { 
                    alert === true
                    ? <h3 className="aleat_t">재고가 얼마 남지 않았습니다.</h3>
                    : null              
                }                         
                <div className="col-md-6 prod">
                    {/* <img src={ 'https://codingapple1.github.io/shop/shoes' + (find.id + 1) + '.jpg'  }  width="90%" /> */}
                    <img src={find.img}  width="90%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{ find.title } </h4>  
                    <div className="hart" onClick={hartplus} >💕{hart}</div>              
                    <p className="ppo">{ find.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }원</p> 
                    <p className='drb' >배송비 :  전상품 무료배송</p>                               
                </div>
            </div>
            <div className="buybox">
              <button className="btn btn-danger btnjin" onClick={ () => { showchan(!show) } } >{ show ? "닫기" : '구매하기' }</button> 
              {/* <button className="btn btn-danger" onClick={ () => { history.goBack(); } } >뒤로가기</button>  */}
              <button className="btn btn-danger btnjin" onClick={ () => { 
                            history.push('/cart'); 
                            props.dispatch( { type : 'addcart', payload : find, payload2 : props.noticechan } );
                   } } >장바구니</button> 
            </div>
            {
                show === true 
                ? <div className="popup">                                                               
                        <select name='color' onChange={ (e) => { setcolor_selec( e.target.value ); } }>
                            {
                               find.option.color.map((item, i) => {
                                     return  <option value={item} key={i} >{item}</option>;
                               })
                            }                         
                        </select>
                        <select name='size' onChange={ (e) => { setsize_selec( e.target.value ); } } >
                            {
                                find.option.size.map((item, i) => { 
                                      return  <option value={item} key={i}>{item}</option>;
                                })
                            }                         
                        </select>
                        <div className="total"> 
                            <h3></h3>
                            <h3><span className="s1">합계 :</span><span className="s2">{ find.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }원</span></h3>                            
                        </div>
                    </div>      
                : null     
            }

            <Nav variant="pills" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={ () => { csstrnchan(false); tabnumchan(0); } } >상품정보</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={ () => { csstrnchan(false); tabnumchan(1); } } >사이즈</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={ () => { csstrnchan(false); tabnumchan(2); } } >리 뷰</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" onClick={ () => { csstrnchan(false); tabnumchan(3); } } >교환/반품</Nav.Link>
                </Nav.Item>               
            </Nav>

            <CSSTransition in={csstrn} classNames="wow" timeout={400} >            
              <TabUI tabnum={tabnum} csstrnchan={csstrnchan} find={find} />
            </CSSTransition>     
         </div>    
      );
  }

function TabUI (props){
    useEffect( () => {
             props.csstrnchan(true);  
       } );
       
    if( props.tabnum === 0 ){
        return <div className="tab_con"> 
                  <h4>{props.find.title}</h4>               
                  <img src={props.find.img}  width="80%" />
               </div>
    } else if( props.tabnum === 1 ){
        return <div className="tab_con">사이즈 는 각자 발사이즈 맞는거 고르자.</div>       
    } else if( props.tabnum === 2 ){
        return <div className="tab_con">악플 사절. (준비중 입니다.)</div>
    } else if( props.tabnum === 3 ){
        return <div className="tab_con">교환/반품 준비중 입니다. from JHshop</div>
    }    
}  


function makeprops( state ){
    return {
         state : state   
     };
}

export default connect(makeprops)(Detail);

// export default Detail;