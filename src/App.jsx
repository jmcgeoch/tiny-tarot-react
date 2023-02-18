import './App.css';
import Journal from './Journal';
import Shuffle from './Shuffle';
import Search from './Search';
import { BrowserRouter, NavLink, Outlet, Route, Routes } from 'react-router-dom';

function Header() {

  return (
    <div className='headerNav'>
      <a className='title'>Tiny Tarot</a>
      <NavLink to='/' className='navLink'>Shuffle</NavLink>
      <NavLink to='journal' className='navLink'>Journal</NavLink>
      <NavLink to='search' className='navLink'>Search</NavLink>
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
