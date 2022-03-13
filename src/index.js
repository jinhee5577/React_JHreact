import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';


let cartstore = []; 

function reducer(state = cartstore, action ){  
    if( action.type === 'addcart' ) {
        let stateindex = state.findIndex( (a) => { return a.id === action.payload.id } );
          if( stateindex >= 0 ){
               alert('해당상품이 이미 장바구니에 있어요.');
               return  state;                  
          } else {
              let copy = [...state];
              copy.push(action.payload);
              return copy;
          }          

    } else if( action.type === 'delete' ){
         let indexnum = state.findIndex( (a) => { return a.id === action.payload } );
         let copy = [...state];
         copy.splice(indexnum,1);
         return copy;

    } else if( action.type === 'minus' ){
        let copy = [...state];
          if( copy[action.index].qunn > 1 ){      
              copy[action.index].qunn--; 
              return copy;  
          } else {
            return state;
          }        

    } else if( action.type === 'plus' ){
         let copy = [...state];
         copy[action.index].qunn++; 
         return copy;  

    } else{
      return state;
    }      
}

function reducer2(state = [], action){
    if(action.type === 'resent'){
        return state = action.payload;
    } else {
        return state;
    }     
}

function cinema(state = {}, action){
    if(action.type === 'cinema'){
        return state = action.payload;  
    } else {
        return state;
    }
}


let vipcinema = [
        { 
          to : 0,
          time : ['09:00', '11:09'],
          nowclick : false, 
          set : 23,
          vip : 0
        },
        {
          to : 1,
          time : ['11:20', '13:30'],
          nowclick : false,
          set : 23,
          vip : 0
        },
        {
          to : 2,
          time : ['13:45', '15:54'],
          nowclick : false,
          set : 23,
          vip : 0
        },
        {
          to : 3,
          time : ['16:10', '18:19'],
          nowclick : false,
          set : 23,
          vip : 0
        },
        {
          to : 4,
          time : ['21:00', '23:10'],
          nowclick : false,
          set : 23,
          vip : 0
        },
  ];
 
function premium(state = vipcinema, action){    
    if(action.type === 'v'){
      let copy = [...state];    
      let copy2 = [...state];
          copy2.splice(action.i, 1);          
      if(copy[action.i].to === action.i){        
         if( copy[action.i].set > 0 ){           
              copy[action.i].set--;
              copy[action.i].vip++;
              copy2.forEach((e) => { e.set = 23;  e.vip = 0; })  //내가선택한것 빼고 나머지들
              return copy;
            } else {      
                copy[action.i].set = 23;
                copy[action.i].vip = 0;
                return copy;
            }  
        }  
    } else {
        return state; 
    }      
 }

let store = createStore( combineReducers({ reducer, reducer2, cinema, premium, }) );


ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter basename="/reactJH">
       <Provider store={store} >
          <App />
       </Provider>
     </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
