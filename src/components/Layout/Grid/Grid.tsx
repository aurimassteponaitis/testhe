import React, { ReactNode } from 'react';
import styles from './Grid.module.scss';
import Loader from '@Components/Loader';

interface GridProps<T> {
  data: T[];
  drawItem: (item: T) => ReactNode;
  loading: boolean;
}

const Grid = <T,>({ data, drawItem, loading }: GridProps<T>) => {
  return (
    <div>
      <Loader isLoading={loading} />
      <div className={styles.container}>
        {data &&
          data.length &&
          data.map((dataItem, index) => {
            return (
              <div key={index} className={styles.item}>
                {drawItem(dataItem)}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Grid;
