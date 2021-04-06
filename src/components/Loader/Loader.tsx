import React from 'react';
import styles from './Loader.module.scss';

interface ILoader {
  isLoading: boolean;
}

const Loader = ({ isLoading = false }: ILoader) => {
  return (
    <>
      {isLoading && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader} />
        </div>
      )}
    </>
  );
};

export default Loader;
