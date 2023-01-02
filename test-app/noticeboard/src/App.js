import {useEffect, useState} from 'react';
import './App.css';
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Axios from 'axios';
// import {Routes, Route} from 'react-router-dom';
// import Header from './layout/Header';
// import Navbar from './layout/Navbar';


function App() {
  const [boardContent, setBoardContent] = useState({
    title: '',
    comment: ''
  })

  const [viewContent, setViewContent] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8000/api/get').then((response) => {
      setViewContent(response.data);
    })
  }, [viewContent])

  const submitReview = () => {
    Axios.post('http://localhost:8000/api/insert', {
      BOARD_TITLE: boardContent.title,
      BOARD_COMMENT: boardContent.comment
    }).then(()=>{
      alert('등록완료');
    })
  }

  const getValue = e =>{
    const { name, value } = e.target;
    setBoardContent({
      ...boardContent,
      [name]: value
    })
  }

  return (
    <>
      <div className='board'>
        <a href='https://www.namuintelligence.com/' target='_blank'>
            <button className='home-button'><h1>namuintelligence notice board</h1></button>
        </a>
        <div className='notice-board'>
          {viewContent.map(element => 
            <div style={{ border: '1px solid #333' }}>
              <h2>{element.title}</h2>
              <div>
                {parse(element.content)}
              </div>
            </div>
            )}
      </div>
      <div className='form-wrapper'>
        <input className='title-input' type='text' placeholder='제목' onChange={getValue} name='title'></input>
        <CKEditor
                    editor={ ClassicEditor }
                    data="<p>내용을 입력하세요.</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setBoardContent({
                          ...boardContent,
                          content: data
                        })
                        console.log(boardContent)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
      </div>
      <button className='submit-button'
        onClick={submitReview}
      >upload</button>
      </div>
    </>
  );
}

export default App;
