import { useState, useEffect } from 'react';
const MobileThrashold = 768;

function usePageWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    const [mobile, setMobile] = useState(window.innerWidth <= MobileThrashold);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
            setMobile(window.innerWidth <= MobileThrashold);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {width: width, mobile: mobile};
}

export default usePageWidth;