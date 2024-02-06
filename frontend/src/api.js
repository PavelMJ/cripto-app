import { cryptoAssets, cryptoData } from "./data";

export function fakeFetchData() {
  return new Promise((res) => {
    setTimeout(() => {
      res(cryptoData);
    }, 2000);
  });
}

export function fakeFetchAssets() {
  return new Promise((res) => {
    setTimeout(() => {
      res(cryptoAssets);
    }, 1000);
  });
}
