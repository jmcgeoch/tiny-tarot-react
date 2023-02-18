import './App.css';
import Journal from './Journal';
import Shuffle from './Shuffle';
import Search from './Search';
import { useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';

function Header() {

  return (
    <div className='headerNav'>
      <a className='title'>Tiny Tarot</a>
      <Link to='/' className='navLink'>Shuffle</Link>
      <Link to='journal' className='navLink'>Journal</Link>
      <Link to='search' className='navLink'>Search</Link>
    </div>
  );
}

function App() {

  return (
    <><BrowserRouter>
      <div className="App">
        <Header />
        <Outlet />
      </div>
      <Routes>
        <Route index element={<Shuffle />} />
        <Route path='journal' element={<Journal />} />
        <Route path='search' element={<Search />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
