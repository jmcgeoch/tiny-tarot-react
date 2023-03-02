import './App.css';
import { NavLink, Outlet } from 'react-router-dom';
import { settings } from './resources/icons/iconIndex';
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate()

  return (
    <div className='headerNav'>
      <NavLink to='/' className='title'>Tiny Tarot</NavLink>
      <NavLink to='/' className='navLink'>Shuffle</NavLink>
      <NavLink to='journal' className='navLink'>Journal</NavLink>
      <NavLink to='search' className='navLink'>Search</NavLink>
      <img src={settings}
        className=''
        onClick={() => {
          navigate('settings', { state: { spreads: [0, 0, 0] } })
        }}
        style={ { width: '35px', marginRight: '75px', marginTop: 'auto' } }
        alt='Settings'
        title='Settings'
      />
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
