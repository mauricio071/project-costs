import loading from '../img/loading.svg';

import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={styles.loader__container}>
            <img src={loading} alt='laoding' className={styles.loader} />
        </div>
    )
}

export default Loading;