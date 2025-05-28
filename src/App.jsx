import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "leaflet/dist/leaflet.css";
import 'font-awesome/css/font-awesome.min.css';
import { useTheme } from './Contexts/ThemeContext';

function App({ children }) {
  const {theme} = useTheme();
  return (
    <div className={'App'}>
      {children}
    </div >
  )
}

export default App
