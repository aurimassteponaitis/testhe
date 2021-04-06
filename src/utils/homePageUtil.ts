import { LocalStorage } from '@Store/gifs/gifsTypes';
import { getObjectFromLocalStorage } from '@Utils/localStorage';
import { LOCAL_STORAGE_NAME } from '@Store/gifs/gifsSlicer';

const PAGE_LIMIT = 4;

export const getLocalStorageList = () => {
  const localStorageGifs = getObjectFromLocalStorage<LocalStorage>(LOCAL_STORAGE_NAME);
  if (!localStorageGifs) {
    return [];
  }
  const localStorageKeys = Object.keys(localStorageGifs || {});
  const mappedLocalStorage = localStorageKeys.map((key) => localStorageGifs[key]);
  return mappedLocalStorage;
};

export const getRequestParams = (page: number) => {
  const localStorageGifs = getObjectFromLocalStorage<LocalStorage>(LOCAL_STORAGE_NAME);
  const pageLimit = Object.keys(localStorageGifs || {}).length + PAGE_LIMIT;
  return { limit: pageLimit, offset: page * pageLimit };
};
