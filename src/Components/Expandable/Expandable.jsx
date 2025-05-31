import React, { useState } from 'react';
import styles from './Expandable.module.css';
const Expandable = ({ autohide=true, children, ...props }) => {
    const div_id = React.useRef(`expandable-${Math.random().toString(36).substring(2, 9)}`);
    const cont_id = React.useRef(`expandable-container-${Math.random().toString(36).substring(2, 9)}`);
    const [exp, setExp] = useState(false);
    const timeref = React.useRef(null);
    const [inTransition, setInTransition] = useState(false);
    const animExpand = () => {
        if (exp || inTransition) return;
        setInTransition(true);
        const id = div_id.current;
        const element = document.getElementById(id);
        element.classList.remove(styles.hidden);
        element.classList.remove(styles.thide);
        element.classList.add(styles.tshow);
        const element2 = document.getElementById(cont_id.current);
        element2.classList.remove(styles.thide_2);
        element2.classList.add(styles.tshow_2);
        setExp(true);
        setTimeout(() => {
            setInTransition(false);
        }, 475);
    }

    const animHandle = () => {
        if (exp) {
            animCollapse(true);
        } else {
            animExpand();
        }
    }
    
    const animCollapse = (insta) => {
        if (!exp || inTransition) return;
        const id = div_id.current;

        const element = document.getElementById(id);
        const element2 = document.getElementById(cont_id.current);
        const collapse = () => {
            setInTransition(true);
            element2.classList.add(styles.thide_2);
            element2.classList.remove(styles.tshow_2);
            element.classList.add(styles.thide);
            element.classList.remove(styles.tshow);
            setTimeout(() => {
                element.classList.add(styles.hidden);
                setInTransition(false);
            }, 475);
            setExp(false);
        }
        if (timeref.current) {
            clearTimeout(timeref.current);
        }
        if (insta) {
            collapse();
            return;
        }
        else {

            timeref.current = setTimeout(() => {
                collapse();
            }, 5000);
        }


        // if (element) {
        //     element.classList.add(styles.collapse);
        //     setTimeout(() => {
        //         element.classList.remove(styles.collapse);
        //         console.log('animCollapse-end', id);
        //     }, 500);
        // }
    }

    return (
        <div className={`${styles.outer_container}`} {...props}>
            <div className={`${styles.container} ${styles.thide_2}`}
                onMouseLeave={() => {if (autohide) { animCollapse() } }}
                id={cont_id.current}
                >
                <div onClick={() => { animHandle() }} className={styles.toggle}>
                    <span style={{ transition: 'all ease-in 0.5s' }} className={!exp ? 'bi bi-list' : 'bi bi-x-lg'}></span>
                </div>
                <div
                    id={div_id.current}
                    className={`${styles.expandable} ${styles.thide} ${styles.hidden}`}>{children}</div>
            </div>
        </div>
    );
};

export default Expandable;