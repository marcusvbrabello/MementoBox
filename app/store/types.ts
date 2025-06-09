export type Photo = { id: string; uri: string; timestamp: number; lat: string; long: string };

export type States = {
  photos: Array<Photo>;
  selectedPhoto: Photo;
};

export type Actions = {
  changePhotos: (payload: Array<Photo>) => void;
  changeSelectedPhoto: (payload: Photo) => void;
  reset: () => void;
};
