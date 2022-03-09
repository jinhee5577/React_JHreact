 /*eslint-disable*/ 
import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { Table, } from 'react-bootstrap';
import { connect } from 'react-redux';


function Cart(props){  
  
     return(
         <div>
            <Table striped bordered hover>
                <thead>
                    <tr>                    
                     <th>장바구니</th>                  
                    </tr>
                </thead>
                <tbody>
                  { 
                    props.state.map( (item, i) => {   
                       item['total'] = item.price * item.qunn;  
                  //     console.log(item);                    
                          return (
                            <tr key={i}>                    
                              <td>
                                <img src={item.img} width="32%" />
                                <div className="carbox">
                                  <h3 className="cart_t">{item.title}</h3> 
                                  <h3 className="cart_p">{(item.price * item.qunn).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }원</h3> 
                                  <div className="qunnti">
                                    <span onClick={ () => { props.dispatch({ type : 'minus', index : i }); } }>-</span> <h5>{ item.qunn }</h5> 
                                    <span onClick={ () => { props.dispatch({ type : 'plus',  index : i }); 
                                     //   console.log(item.qunn);
                                     } } >+</span>
                                  </div>                                   
                                  <button className="delete_h" onClick={ () => { 
                                      props.dispatch( { type : 'delete', payload : item.id } );
                                    } }>삭제</button>
                                  <article>
                                    <h5>옵션 : {item.select[0]} / {item.select[1]} </h5>
                                  </article>  
                                </div>                               
                              </td>                    
                            </tr>  
                          );                                    
                      } )
                  }                                              
                </tbody>
            </Table>
            <div className="total_cart">
                 <h2>장바구니 수량 : <span>{ props.state.length }</span> </h2> 
                 <h2>총 상품금액 : <span>{ props.state.reduce( (prev, cerr) => { 
                                          //      console.log(prev);
                                         //       console.log(cerr);
                                        //        console.log(prev + cerr.total);
                                                return prev + cerr.total;  
                     }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') } 원</span> </h2>   
            </div>
            {/* {
              props.notice === true
              ? <div>해당상품이 이미 장바구니에 있어요.</div>
              : null
            } */}
      
         </div> 
     ); 
}


function makeprops( state ){
  //  console.log(state);
    return {
         state : state.reducer   
     };
}

export default connect(makeprops)(Cart);

// export default Cart;
