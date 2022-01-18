 /*eslint-disable*/ 
import React, { Component, useState, useEffect, useRef} from 'react';
import './App.css';

const { kakao } = window;

function Kakaomap() { 
    const [inputText, setInputText] = useState("");
    const [searchPlace, setsearchPlace] = useState("");
    const [showplace, setshowplace] = useState([]);
    // const [mapheight, setmapheight] = useState(flase);
    let location = useRef();
    let location2 = useRef();    

    useEffect(() => {
         let infowindow = new kakao.maps.InfoWindow({zIndex:1});
         const mapcontainer = document.getElementById('kakaomap');
         const options = {
             center: new kakao.maps.LatLng(33.450701, 126.570667),
             level: 3
         };
         const map = new kakao.maps.Map(mapcontainer, options);

         // 장소 검색 객체를 생성
         const ps = new kakao.maps.services.Places();
         // 키워드로 장소를 검색
         ps.keywordSearch(searchPlace, placesSearchCB); 

         function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds();
                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       
                map.setBounds(bounds);
                 // 페이지 목록 보여주는 displayPagination() 추가
                  displayPagination(pagination);
                  console.log(data);                
                  setshowplace(data);
               //  console.log(showplace);
            } 
          }

        // 검색결과 목록 하단에 페이지 번호 표시
        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i
    
            // 기존에 추가된 페이지 번호 삭제
            while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild)
            }
    
            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement('div')
                // el.href = '#'
                el.innerHTML = i
        
                if (i === pagination.current) {
                    el.className = 'on'
                } else {
                    el.onclick = (function (i) {
                        let maptop = location.current.offsetTop;
                     //   console.log(maptop);
                        window.scrollTo({top:maptop + 350, behavior:'smooth'});
                        return function () {
                            pagination.gotoPage(i)
                        }
                    })(i)
                }    
                fragment.appendChild(el)
            }
            paginationEl.appendChild(fragment)
        }  

        // 지도에 마커를 표시하는 함수   
        function displayMarker(place) {
         //   console.log(place);
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });
            kakao.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div id="view_p" style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
                infowindow.open(map, marker)
              });
         } 
         
         function setDraggable(flase) {
            // 마우스 드래그로 지도 이동 가능여부를 설정합니다
            map.setDraggable(flase);    
        }

     }, [searchPlace] );    
 
     useEffect( () => { 
        location.current.addEventListener('click', () => { 
            location.current.classList.add('km');
            location2.current.classList.add('km2');
        } );
       }, []);
    
     return(
          <>
            <h3 className="youph kamtitle">장소를 검색해 보자</h3>  
            <div id="jinheemap" ref={location} >
                <div id="kakaomap"> 
                </div>
                <form onSubmit={ (e) => { 
                        e.preventDefault();
                        setsearchPlace(inputText);
                        setInputText("");
                    } } >
                    <input className="search" placeholder="Search Place" 
                        onChange={ (e) => { setInputText(e.target.value); } } value={inputText}/> 
                    <button className="mapbt" type="submit">검색</button>
                </form>
                <div id="showplace" ref={location2} >
                {
                    showplace.map( (item, i) => { 
                        return(
                            <div className="kamapbox" key={i} >
                            <h5>{item.place_name} <span>{item.category_group_name}</span></h5>
                            <h6>{item.road_address_name}</h6>
                            <h6>{item.phone} </h6>       
                            </div>   
                        );                
                    } )
                }  
                <div id="pagination" onClick={ () => {      
                } } ></div>
                </div>
            </div>
          </>    
     );
 }

 export default Kakaomap;