import React, { useEffect } from 'react';
import Header from '../Components/Header/Header';
import MobileFooter from '../Components/MobileFooter/mobileFooter';

const NavLayout = ({ children }) => {
 
    return (
        <>
            <Header />
            
            {children}
            <MobileFooter />
        </>
    );
};

export default NavLayout;