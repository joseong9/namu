import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Link to='./Join'>
        <button>게시판</button>
      </Link>
      <Link to='./Upload'>
        <button>업로드</button>
      </Link>
      <Link to='./'>
        <button>홈</button>
      </Link>
    </div>
  )
}

export default Navbar
