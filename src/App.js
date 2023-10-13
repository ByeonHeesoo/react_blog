/* eslint-disable */
import { useState } from 'react';
import './App.css';

function App() {

  let [title, setTitle] = useState(['여자 아우터 추천', '리액트 독학', '제주도 맛집']);
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [textTitle, setTextTitle] = useState(0);
  let [inputValue, setInputValue] = useState('');


  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{fontSize : '20px'}}>나의 리액트 블로그</h4>
      </div>

      <button onClick={() => {
        let copyTitle = [...title];
        copyTitle.sort();
        setTitle(copyTitle);
      }}>가나다 순 정렬하기</button>


      {
        title.map(function (a, i) {
          return (
            <div className="list" key={i}>
              <h4 onClick={() => {setModal(!modal); setTextTitle(i)}}>{a}
                <span onClick={(e) => {
                  // ♥ 누를 때마다 숫자 1씩 증가
                  let copyLike = [...like];
                  copyLike[i] = copyLike[i] + 1;
                  setLike(copyLike);
                  e.stopPropagation(); // 이벤트 버블링 방지
                }}>❤️</span> {like[i]}
              </h4>
              <p>10월 1일 발행</p>
              <button onClick={() => {
                // 글 삭제할 때
                let copyDelete = [...title];
                copyDelete.splice(i, 1);
                setTitle(copyDelete);
              }}>삭제</button>
            </div>
          )
        })
      }

      <input onChange={(e) => {
        setInputValue(e.target.value);
      }} />
      <button onClick={() => {
        // 제목을 공백으로 등록할때
        if(inputValue=='') {
          alert("글 제목을 입력해주세요!");
        } else {
          // 글 제목 상태 변경
          let copyInputValue = [...title];
          copyInputValue.unshift(inputValue);
          setTitle(copyInputValue);
          // ♥ 상태 변경
          let copyLike = [...like];
          copyLike.unshift(0);
          setLike(copyLike);
        }
      }}>등록</button>

      {/* 모달 컴포넌트 띄우기 */}
      {
      modal == true ? <Modal textTitle={textTitle} color={'#ececec'} title={title} setTitle={setTitle} /> : null
      }
    </div>
  );
}

// 모달 컴포넌트
function Modal(props) {
  return (
    <div className="modal" style={{backgroundColor : props.color}}>
      <h4>{props.title[props.textTitle]}</h4>
      <p>날짜</p>
      <p>상세내용 : 모든 국민은 인간다운 생활을 할 권리를 가진다.</p>
    </div>
  )
}


/*
-------React 기본 문법------
1. 클래스 이름을 붙일 때는 className이라고 씀
2. 태그에서 바로 스타일 붙일 때는 {} 안에 카멜 케이스로 작성
3. 변수를 갖다 쓸때는 {} 안에 작성

useState 사용
import 해주고 let [count, setCount] = useState(0); 하면
count는 0이 되고 setCount는 0을 변경하는 함수

-왜 state를 써야하는가?
state는 갑자기 변경되면 state를 쓰던 html은 자동으로 재렌더링 되면서 변경이 반영됨

- 배열과 객체의 state 조작(변경) 방법
배열을 복사해서 변경하려면 [...배열]로 복사해야 배열 내의 값까지 복사가 됨

- 컴포넌트 만드는 법
1. function App 외부에 다른 function 만들고
2. 그 function 안에 return () 안에 html 담기
3. function App 내부 위치에 <컴포넌트 명 /> 또는 <컴포넌트 명></컴포넌트 명> 작성
(반복적인 html을 축약할 때, 큰 페이지, 자주 변경되는 것들을 컴포넌트로 만들면 좋음)

- 동적인 UI 만들기
1. html, css로 디자인 완성
2. UI의 현재 상태를 state로 저장
3. state에 따라 UI가 어떻게 보일지 작성

- props로 부모 => 자식 state 전송하는 방법
1. 자식 컴포넌트 사용하는 곳에서 <자식컴포넌트명 작명={state이름}/> 작성
2. 자식 컴포넌트 만들었던 function으로 가서 props라는 파라미터 등록 후 props.작명 사용
** state 이외에 변수, 함수 전송도 가능, 일반 문자 전송도 가능
** 오로지 부모 => 자식 방향으로만 전송 가능!!!
** 자식 => 부모 또는 자식끼리의 전송은 불가능

- input 입력값 가져오기
e.target.value

- 이벤트 버블링 방지
e.stopPropagation();

- 이벤트 기본 동작 방지
e.preventDefault();

- map()



맨 위에 주석으로 eslint-disable 작성하면 경고메시지 안뜨게 함
*/

export default App;
