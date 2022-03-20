 /*eslint-disable*/ 
import React, { useEffect, useState, useRef} from 'react';
import './App.css';

function Seach_input (props){ 
    let { reference, jinmov, history } = props;
    let [Text, setText] = useState("");
    let [return_item, Setreturn_item] = useState([]);
    let [big_status, setbig_status] = useState(false);
    let ref = useRef();
    let total_item = [...reference, ...jinmov];  // 상품데이터배열 + 영화데이터배열 을 합친 토탈데이터 이다.
   
    let search_item = () => {
        let sc_item = total_item.filter((item) => {
               let change_low = item.title.toLowerCase();   // 소문자 변환.              
               return change_low.includes(Text); 
          });
    //    console.log(sc_item);
        Setreturn_item(sc_item);  
    } 

    // let ClickOutside = (e) => {
    //  //    console.log(e.target);
    //     if(e.target !== null ){
    //         if (big_status && !ref.current.contains(e.target)) setbig_status(false);
    //     }                
    // };

    // useEffect(() => { 
    //     window.addEventListener("click", ClickOutside);
    //     return () => {
    //         window.removeEventListener("click", ClickOutside);
    //      }
    // }, [big_status]);
 

    return (
        <>
          <div id='seach_input' ref={ref} onClick={() => {setbig_status(true);}}
            className={ big_status ? 'ext': null } >
            <input id="search_i" placeholder="mall에있는상품,영화 찾아드릴게요!" className={ big_status ? 'ext2': null }
                onChange={ (e) => { setText(e.target.value); } } value={Text}/> 
            <button className="anybt" type="submit" onClick={search_item} >검색</button>
            <article>
                {
                    return_item.length !== total_item.length
                    ? return_item.map((item, i) => {
                            return <p key={i} onClick={() => { 
                                        setbig_status(false);
                                        item.id > 300 
                                        ? history.push('/cinema/' + item.id)
                                        : history.push('/detail/' + item.id)                             
                                    }} >{item.title}</p>;
                        }) 
                    : null
                }
            </article>          
          </div>   
          <div id="back_j" className={ big_status ? 'ext3': null }
            onClick={() => {setbig_status(false);}}> </div>    
        </>        
    );

 }


 export default Seach_input;