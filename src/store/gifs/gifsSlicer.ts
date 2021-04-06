import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APIS from '@Config/apis';
import axios from 'axios';
import { RootState } from '@Store/store';
import { Gif, GifsRequestParams, GifState, LockedIndex } from '@Store/gifs/gifsTypes';
import { getLocalStorageList } from '@Utils/homePageUtil';
import { setObjectToLocalStorage } from '@Utils/localStorage';

export const NAME = 'gifs';
const GIFS_TYPE_PREFIX = `${NAME}/fetchGifs`;
const LOCAL_STORAGE = `${NAME}/addGifs`;
export const LOCAL_STORAGE_NAME = 'testhy_storage';

export const fetchGifs = createAsyncThunk<Gif[], GifsRequestParams, { state: RootState }>(
  GIFS_TYPE_PREFIX,
  async (params, { getState }) => {
    const lockedGifs: Gif[] = getState().gifs.lockedGifs;
    const response = await axios.get<{ data: Gif[] }>(APIS.GIPHY_RANDOM, {
      params,
    });
    return response.data.data.filter((gif) => !lockedGifs.find((localGif) => localGif.id === gif.id));
  },
);

export const toggleLock = createAsyncThunk<Gif[], Gif, { state: RootState }>(LOCAL_STORAGE, (gif, { getState }) => {
  const lockedGifs: Gif[] = getState().gifs.lockedGifs;
  let gifs: Gif[] = [];
  if (lockedGifs.some((element) => element.id === gif.id)) {
    gifs = lockedGifs.filter((element) => element.id !== gif.id);
  } else {
    gifs = [...lockedGifs, gif];
  }
  setObjectToLocalStorage(LOCAL_STORAGE_NAME, gifs);
  return gifs;
});

const gifsSlice = createSlice({
  name: NAME,
  initialState: {
    data: getLocalStorageList(),
    lockedGifs: getLocalStorageList(),
    isLoading: false,
  } as GifState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGifs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGifs.fulfilled, (state, action) => {
      state.data.push(...action.payload);
      const lockedIndexes: LockedIndex[] = state.lockedGifs.map((lockedGif) => {
        return { id: lockedGif.id, index: state.data.findIndex((gif) => gif.id === lockedGif.id) };
      });
      state.data.sort((a, b) => new Date(a.import_datetime).getTime() - new Date(b.import_datetime).getTime());

      lockedIndexes.forEach((lockedIndex) => {
        state.data.splice(
          lockedIndex.index,
          0,
          state.data.splice(
            state.data.findIndex((gif) => gif.id === lockedIndex.id),
            1,
          )[0],
        );
      });

      state.isLoading = false;
    });
    builder.addCase(toggleLock.fulfilled, (state, action) => {
      state.lockedGifs = action.payload;
    });
  },
});

export default gifsSlice.reducer;

export const getGifs = (state: RootState) => state.gifs.data;
export const getLocalStorageGifs = (state: RootState) => state.gifs.lockedGifs;
export const isLoadingGifs = (state: RootState) => state.gifs.isLoading;
