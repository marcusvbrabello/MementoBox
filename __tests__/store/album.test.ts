import { albumStore } from "../../app/store/album";
import { Photo } from "../../app/store/types";

describe("albumStore", () => {
  afterEach(() => {
    albumStore.getState().reset();
  });

  it("should initialize with default photos and selectedPhoto", () => {
    const { photos, selectedPhoto } = albumStore.getState();
    expect(photos.length).toBe(10);
    expect(selectedPhoto).toEqual({
      id: "",
      uri: "",
      timestamp: 0,
      lat: "",
      long: "",
    });
  });

  it("should change photos", () => {
    const newPhotos: Photo[] = [
      { id: "a", uri: "uri1", timestamp: 1, lat: "1", long: "1" },
      { id: "b", uri: "uri2", timestamp: 2, lat: "2", long: "2" },
    ];
    albumStore.getState().changePhotos(newPhotos);
    expect(albumStore.getState().photos).toEqual(newPhotos);
  });

  it("should change selectedPhoto", () => {
    const photo: Photo = {
      id: "x",
      uri: "uriX",
      timestamp: 123,
      lat: "latX",
      long: "longX",
    };
    albumStore.getState().changeSelectedPhoto(photo);
    expect(albumStore.getState().selectedPhoto).toEqual(photo);
  });

  it("should reset to initial state", () => {
    albumStore
      .getState()
      .changePhotos([
        { id: "z", uri: "uriZ", timestamp: 9, lat: "9", long: "9" },
      ]);
    albumStore
      .getState()
      .changeSelectedPhoto({
        id: "z",
        uri: "uriZ",
        timestamp: 9,
        lat: "9",
        long: "9",
      });

    albumStore.getState().reset();
    const { photos, selectedPhoto } = albumStore.getState();
    expect(photos.length).toBe(10);
    expect(selectedPhoto).toEqual({
      id: "",
      uri: "",
      timestamp: 0,
      lat: "",
      long: "",
    });
  });
});
