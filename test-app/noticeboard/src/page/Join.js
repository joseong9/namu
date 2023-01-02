import React from 'react';
import {useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Component } from "react";
import Table from "react-bootstrap/Table"


const Join = () => {
    const contentRef = useRef();
    const nav = useNavigate();

    const handelJoin = (event) => {
        console.log('handleJoin')
        event.preventDefault()
        console.log(contentRef.current.value)

        let userData = {
            content : contentRef.current.value,
        }

        axios.get('http://127.0.0.1:3000/joinData',{
            user : userData
        })
        .then((res)=>{
            console.log('성공', res.data.result)
            alert('등록 성공')
            nav('/')
        })
        .catch(()=>{
            console.log('실패')
        })
    }
  return (
    <div>
      <h3>게시판</h3>
      <form onSubmit={handelJoin}>
        <input name='content' type='text' ref={contentRef} placeholder='내용 입력'></input>
        <input type='submit' value='등록'></input>
      </form>
    </div>
  )
}

export default Join
