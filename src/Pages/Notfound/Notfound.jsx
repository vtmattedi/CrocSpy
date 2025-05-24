
import Logo from '../../assets/logo2.svg';
import CrocImage from '../../assets/croc2.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './Notfound.module.css';
import Header from '../../Components/Header/Header';
import MobileFooter from '../../Components/MobileFooter/mobileFooter';
const NotFound = () => {
    const Navigate = useNavigate();
    return (
        <>
        <Header/>
        <div className={styles.notfound}>
            <img src={Logo} alt="Logo" style={{ width: '40vh' }} />
            <h1>404 - Not Found</h1>
            <div className={styles.textDiv}>
                <h5 style={{ padding: '10px' }}> These are not the</h5>
                <img src={CrocImage} alt="Croc" className={styles.croc} />
                <h5 style={{ padding: '10px' }}> you are looking for. </h5>
            </div>
            
            <Button variant="outline-warning"
                className={styles.button}
                onClick={() => { Navigate("/") }}>Continue the search</Button>
        </div>
        <MobileFooter/>
        </>
    );
};

export default NotFound;