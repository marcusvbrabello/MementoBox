import * as FileSystem from "expo-file-system";
import useToast from "../../../app/hooks/useToast";
import { albumStore } from "../../../app/store/album";
import { useAlbumViewModel } from "../../../app/view_models/album";

jest.mock("expo-file-system", () => ({
  documentDirectory: "/mock/doc/",
  getInfoAsync: jest.fn(),
  readDirectoryAsync: jest.fn(),
  readAsStringAsync: jest.fn(),
}));
jest.mock("../../../app/hooks/useToast", () => jest.fn());
jest.mock("../../../app/store/album", () => {
  const actual = jest.requireActual("../../../app/store/album");
  return {
    ...actual,
    albumStore: jest.fn((cb) => ({
      ...actual.albumStore.getState(),
      changePhotos: jest.fn(),
      changeSelectedPhoto: jest.fn(),
      photos: [],
    })),
  };
});
jest.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: jest.fn(),
  }),
}));

describe("useAlbumViewModel.loadPhotosFromFolder", () => {
  const mockChangePhotos = jest.fn();
  const mockUseToast = useToast as jest.Mock;

  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.log as jest.Mock).mockRestore();
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    albumStore.mockImplementation((cb) =>
      cb({
        changePhotos: mockChangePhotos,
        changeSelectedPhoto: jest.fn(),
        photos: [],
      })
    );
  });

  it("should set empty photos if folder does not exist", async () => {
    (FileSystem.getInfoAsync as jest.Mock).mockResolvedValueOnce({
      exists: false,
    });

    const { loadPhotosFromFolder } = useAlbumViewModel();
    await loadPhotosFromFolder();

    expect(mockChangePhotos).toHaveBeenCalledWith([]);
    expect(mockUseToast).not.toHaveBeenCalled();
  });

  it("should load photos and metadata correctly", async () => {
    (FileSystem.getInfoAsync as jest.Mock)
      .mockResolvedValueOnce({ exists: true })
      .mockResolvedValueOnce({});

    (FileSystem.readDirectoryAsync as jest.Mock).mockResolvedValue([
      "photo_1.jpg",
    ]);
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValue(
      JSON.stringify({
        timestamp: 123,
        location: { coords: { latitude: 1.1, longitude: 2.2 } },
      })
    );

    const { loadPhotosFromFolder } = useAlbumViewModel();
    await loadPhotosFromFolder();

    expect(mockChangePhotos).toHaveBeenCalledWith([
      {
        id: "1",
        uri: "/mock/doc/MementoBoxPhotos/photo_1.jpg",
        timestamp: 123,
        lat: "1.1",
        long: "2.2",
      },
    ]);
    expect(mockUseToast).not.toHaveBeenCalled();
  });

  it("should handle metadata read errors gracefully", async () => {
    (FileSystem.getInfoAsync as jest.Mock)
      .mockResolvedValueOnce({ exists: true })
      .mockResolvedValueOnce({});

    (FileSystem.readDirectoryAsync as jest.Mock).mockResolvedValue([
      "photo_1.jpg",
    ]);
    (FileSystem.readAsStringAsync as jest.Mock).mockRejectedValue(
      new Error("fail")
    );

    const { loadPhotosFromFolder } = useAlbumViewModel();
    await loadPhotosFromFolder();

    expect(mockChangePhotos).toHaveBeenCalledWith([
      {
        id: "1",
        uri: "/mock/doc/MementoBoxPhotos/photo_1.jpg",
        timestamp: 0,
        lat: "",
        long: "",
      },
    ]);
    expect(mockUseToast).not.toHaveBeenCalled();
  });

  it("should call useToast and set empty photos on unexpected error", async () => {
    (FileSystem.getInfoAsync as jest.Mock).mockRejectedValue(
      new Error("unexpected")
    );

    const { loadPhotosFromFolder } = useAlbumViewModel();
    await loadPhotosFromFolder();

    expect(mockUseToast).toHaveBeenCalledWith(
      "Erro ao carregar fotos",
      "danger"
    );
    expect(mockChangePhotos).toHaveBeenCalledWith([]);
  });

  it("should handle multiple photos", async () => {
    (FileSystem.getInfoAsync as jest.Mock)
      .mockResolvedValueOnce({ exists: true })
      .mockResolvedValue({});

    (FileSystem.readDirectoryAsync as jest.Mock).mockResolvedValue([
      "photo_1.jpg",
      "photo_2.jpg",
    ]);
    (FileSystem.readAsStringAsync as jest.Mock)
      .mockResolvedValueOnce(
        JSON.stringify({
          timestamp: 123,
          location: { coords: { latitude: 1.1, longitude: 2.2 } },
        })
      )
      .mockResolvedValueOnce(
        JSON.stringify({
          timestamp: 456,
          location: { coords: { latitude: 3.3, longitude: 4.4 } },
        })
      );

    const { loadPhotosFromFolder } = useAlbumViewModel();
    await loadPhotosFromFolder();

    expect(mockChangePhotos).toHaveBeenCalledWith([
      {
        id: "1",
        uri: "/mock/doc/MementoBoxPhotos/photo_1.jpg",
        timestamp: 123,
        lat: "1.1",
        long: "2.2",
      },
      {
        id: "2",
        uri: "/mock/doc/MementoBoxPhotos/photo_2.jpg",
        timestamp: 456,
        lat: "3.3",
        long: "4.4",
      },
    ]);
    expect(mockUseToast).not.toHaveBeenCalled();
  });
});
