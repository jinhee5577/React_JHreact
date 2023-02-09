 /*eslint-disable*/ 
import React, { Component, useState, useEffect, useRef} from 'react';
import './App.css';

const { kakao } = window;

function Kakaomap() { 
    const [inputText, setInputText] = useState("");
    const [searchPlace, setsearchPlace] = useState("장소");  
     // 컴포넌트가 로드되는 순간 카카오키워드검색 ajax.get요청 이 실행되기 기본값 "" 이거 때문에 요청url부분 query=& 으로 query값이 빈값으로 요청된다. 따라서 400 에러 메세지가 뜬다.
     // 오류를 막고자 기본값을 아무거나 지정후 , 또하나의 상태값을 만들어 장소검색시만 ckStatus = true로 변경되어 장소검색get요청이 실행된다. 
    const [showplace, setshowplace] = useState([]);
    let [ckStatus, setckStatus] = useState(false);
    let location = useRef();
    let location2 = useRef();    

    
    useEffect(() => {
         let infowindow = new kakao.maps.InfoWindow({zIndex:1});
         const mapcontainer = document.getElementById('kakaomap');
         const options = {
             center: new kakao.maps.LatLng(33.450701, 126.570667),
             level: 3
         };
         const map = new kakao.maps.Map(mapcontainer, options);  // 지도를 생성합니다

         if(!ckStatus){
            // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
            if (navigator.geolocation) {  // 현재위치.      
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function(position) {                
                const lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도     
                    //   console.log(lat);                
                const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                        message = '<div id="me" style="padding:3px;">me</div>'; // 인포윈도우에 표시될 내용입니다
                
                // 마커와 인포윈도우를 표시합니다
                currDisplayMarker(locPosition, message);                    
                });
            
            } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다            
                const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                    message = 'geolocation을 사용할수 없어요..'
                
                    currDisplayMarker(locPosition, message);
            }

            // 지도에 마커와 인포윈도우를 표시하는 함수입니다
            function currDisplayMarker(locPosition, message) {
                // 마커를 생성합니다
                const marker = new kakao.maps.Marker({  
                    map: map, 
                    position: locPosition
                });             
                const iwContent = message, // 인포윈도우에 표시할 내용
                    iwRemoveable = true;

                // 인포윈도우를 생성합니다
                let infowindow = new kakao.maps.InfoWindow({
                    content : iwContent,
                    // removable : iwRemoveable
                });
            
                // 인포윈도우를 마커위에 표시합니다 
                infowindow.open(map, marker);
            
                // 지도 중심좌표를 접속위치로 변경합니다
                map.setCenter(locPosition);      
            }        
         }             

         // 장소 검색 객체를 생성
         const ps = new kakao.maps.services.Places();


         if(ckStatus){  // 또하나의 상태값을 만들어 장소검색시만 ckStatus = true로 변경되어 장소검색get요청이 실행된다. 
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
                  //    console.log(data);                
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
                    const el = document.createElement('div')
                    // el.href = '#'
                    el.innerHTML = i
            
                    if (i === pagination.current) {
                        el.className = 'on'
                    } else {
                        el.onclick = (function (i) {
                            // let maptop = location.current.offsetTop;
                           //  console.log(maptop);
                            // window.scrollTo({top:maptop + 350, behavior:'smooth'});
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
                    infowindow.setContent('<div id="view_p" style="padding:3px;font-size:11px;">' + place.place_name + '</div>')
                    infowindow.open(map, marker)
                  });
             } 
             
             function setDraggable(flase) {
                // 마우스 드래그로 지도 이동 가능여부를 설정합니다
                map.setDraggable(flase);    
            }

         }       

         return () => { setckStatus(false); }

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
                <form onSubmit={(e) => { 
                        e.preventDefault();
                        setsearchPlace(inputText);
                        setckStatus(true);
                        setInputText("");
                }}>
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
                <div id="pagination"></div>
                </div>
            </div>
          </>    
     );
 }

 export default Kakaomap;