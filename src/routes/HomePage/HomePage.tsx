import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import Toolbar from '@Components/Toolbar';
import Grid from '@Components/Layout/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGifs, getGifs, getLocalStorageGifs, isLoadingGifs, toggleLock } from '@Store/gifs/gifsSlicer';
// FIXME
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Lock from '@Images/lock.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Unlock from '@Images/unlock.svg';
import Typography from '@Components/Typography';
import { useKeyPress } from '@Hooks/useKeyPress';
import { getRequestParams } from '@Utils/homePageUtil';

const SPACE_KEY_CODE = 32;
const INITIAL_CURRENT_PAGE = 0;
const INCREASE_PAGE_BY = 1;

const HomePage = () => {
  const dispatch = useDispatch();
  const gifs = useSelector(getGifs);
  const gifsLocalStore = useSelector(getLocalStorageGifs);
  const isLoading = useSelector(isLoadingGifs);
  // 32 - space key code
  const isSpaceButtonPressed = useKeyPress(SPACE_KEY_CODE);
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);

  useEffect(() => {
    // fetch data on first mount
    dispatch(fetchGifs(getRequestParams(currentPage)));
  }, []);

  useEffect(() => {
    // on space button press - fetch more data
    if (isSpaceButtonPressed) {
      fetchMoreGifs();
    }
  }, [isSpaceButtonPressed]);

  const fetchMoreGifs = () => {
    setCurrentPage((prevState) => {
      const nextPage = prevState + INCREASE_PAGE_BY;
      dispatch(fetchGifs(getRequestParams(nextPage)));
      return nextPage;
    });
  };

  return (
    <div className={styles.homeContainer}>
      <Toolbar onButtonClick={fetchMoreGifs} />
      <Grid
        data={gifs}
        drawItem={(gif) => {
          const locked = gifsLocalStore.find((thisGif) => thisGif.id === gif.id);
          return (
            <div className={styles.imagesContainer} onClick={() => dispatch(toggleLock(gif))}>
              <img src={gif.images.original.url} className={styles.image} />
              <div className={styles.iconContainer}>
                <img src={locked ? Unlock : Lock} />
                <Typography msg={`Click to ${locked ? 'unlock' : 'lock'}`} />
              </div>
            </div>
          );
        }}
        loading={isLoading}
      />
    </div>
  );
};

export default HomePage;
