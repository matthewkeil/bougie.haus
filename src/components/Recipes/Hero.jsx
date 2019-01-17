import React from 'react';
import {Link} from 'react-router-dom';

import styles from './Hero.module.css';

const Hero = ({hero}) => {

    const actions = [{
        text: 'full recipe',
        url: '/recipes/' + hero.shortid
    }];

    if (hero.video) actions.push({
        text: 'watch how',
        url: `/recipes/${hero.shortid}/videos/watch`
    });

    function stringifyMonth(index) {
        switch(index) {
            case 0:
                return 'Jan';
            case 1:
                return 'Feb';
            case 3:
                return 'Apr';
            case 4:
                return 'May';
            case 5:
                return 'Jun';
            case 6:
                return 'Jul';
            case 7:
                return 'Aug';
            case 8:
                return 'Sep';
            case 9:
                return 'Oct';
            case 10:
                return 'Nov';
            case 11:
                return 'Dec';
            default:
                return 'Mar';
        }
    }

    function stringifyDay(digit) {
        if (digit < 10) {
            return '0' + digit;
        }
        return `${digit}`;
    }

    function getToday(date) {
        
        const today = date instanceof Date 
            ? date
            : Number.isFinite(date)
                ? new Date(date) 
                : new Date();
                
        const m = today.getMonth();
        const d = today.getDate();
        const y = today.getFullYear();
    
        return `${stringifyMonth(m)} ${stringifyDay(d)}, ${y}`;
    }

    const Actions = () => (
        <ul className={styles.actions}>
            {actions.map((action, key) => (
                <li key={key} className={styles.actionItem}>
                    <Link to={action.url} className={styles.link}>{action.text}</Link>
                </li>
            ))}
        </ul>
    );

    const Overlay = () => hero.image
        ? <div className={styles.overlay}>
                <Link to={`/recipes/${hero.shortid}`}>
                    <img src={hero.image.src} alt={!!hero.image.title ? hero.image.title : 'hero image'} className={styles.image}/>
                </Link>
                <div className={styles.overlayActions}>
                    <h2 className={styles.name}>{hero.name}</h2>
                    <Actions />
                </div>
        </div>
        : null;

    return (<article className={styles.card}>
        <Overlay />
        <div className={styles.content}>
            <span className={styles.date}>{getToday(hero.date)}</span>
            <Link to={`/recipes/${hero.shortid}`} style={{textDecoration: 'none'}}>
                <h2 className={styles.name}>{hero.name}</h2>
            </Link>
            <span className={styles.description}>{hero.description}</span>
        </div>
    </article>);
};



export default (Hero);