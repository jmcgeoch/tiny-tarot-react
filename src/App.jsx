import './App.css';
import { NavLink, Outlet } from 'react-router-dom';

function Header() {

  return (
    <div className='headerNav'>
      <NavLink to='/' className='title'>Tiny Tarot</NavLink>
      <NavLink to='/' className='navLink'>Shuffle</NavLink>
      <NavLink to='journal' className='navLink'>Journal</NavLink>
      <NavLink to='search' className='navLink'>Search</NavLink>
    </div>
  );
}

function App() {

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
