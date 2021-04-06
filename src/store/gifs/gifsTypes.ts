export type GifState = {
  data: Gif[];
  lockedGifs: Gif[];
  isLoading: boolean;
};

export type Gif = {
  id: string;
  images: GifImage;
  import_datetime: string;
};

type GifImage = {
  original: FixedHeight;
};

type FixedHeight = {
  url: string;
};

export type GifsRequestParams = {
  limit: number;
  offset: number;
};

export type LocalStorage = {
  [index: string]: Gif;
};

export type LockedIndex = {
  id: string;
  index: number;
}
