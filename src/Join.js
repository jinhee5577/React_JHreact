 /*eslint-disable*/ 
import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import axios from 'axios';


function Join(){
   let [enter, enterchan] = useState(false);
   let [input_id, setinput_id] = useState(''); 
   let [input_pass, setinput_pass] = useState('');
   let [username, setusername] = useState(''); 
   let history = useHistory();
   let account = { 
             id : input_id,
             password : input_pass, 
             name : username           
       };  

   let axios_login = () => {  
              axios.get('https://raw.githubusercontent.com/jinhee5577/allData/master/logindata.json')
              .then( (res) => { 
                     console.log(res.data.users);          
                    let user = res.data.users.find( (u) => { return u.id === account.id } );                   
                        console.log(user);                         
                        if(account.id === user.id && account.password === user.password) { 
                            enterchan(true); 
                              //   account['name'] = user.name;  추가가 안되네...왜??....
                            setusername(user.name);       
                        } else if( !user || account.password !== user.password ){
                            alert('아이디와 비밀번호를 다시 확인 해주십시요.');
                          //  console.log('아이디 안나와');
                        } 
               } )
              .catch((error) => { alert('아이디를 다시 확인 해주십시요.'); console.log('서버실패'); })                
      }    

    useEffect( () => { 
        
      }, [] );    

 //  console.log(account);

                                                    
     return(
         <div className="joinwrap">             
            <div className="joinbox">
               <h3 className="log_jh">Login JH</h3>                            
               <input className="info" type="text" name='id' placeholder="id" onChange={(e) => { setinput_id(e.target.value); }} />
               <input className="info" type="password" name='password' placeholder="password" onChange={(e) => { setinput_pass(e.target.value); }}/>
               <div className="sendbox">              
                <div className="check">
                  <input type="checkbox"/><span>Remember me!</span>
                </div>  
                <button className="log_button" onClick={axios_login} >Login</button>    
               </div>                             
            </div>
            {
                enter === true
                ? <div className="vip" onClick={ () => { enterchan(false); history.push('/'); } } >
                    <h2 className='out'>어서 오십시오. {username} VIP 회원이십니다.</h2>  
                  </div>
                : null  
            }                     
         </div> 
     ); 
}


export default Join;
