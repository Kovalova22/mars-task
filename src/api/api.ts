import axios, { AxiosResponse } from 'axios';

const apiKey = process.env.REACT_APP_NASA_KEY;

type FetchedDataType<T> = Promise<AxiosResponse<T>>;

type ApiFetchedDataType = {
  nasaPhotos: {
    get: () => FetchedDataType<any>;
  };
};
export const api: ApiFetchedDataType = {
  nasaPhotos: {
    get: () =>
      axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
      ),
  },
};
