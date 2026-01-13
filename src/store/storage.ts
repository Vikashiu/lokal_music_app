// // src/store/storage.ts
// import { MMKVLoader } from 'react-native-mmkv-storage';
// import { StateStorage } from 'zustand/middleware';

// // 1. Initialize the storage
// const storage = new MMKVLoader().withInstanceID('player-storage').initialize();

// // 2. Create the adapter for Zustand
// export const mmkvStorage: StateStorage = {
//   setItem: (name, value) => {
//     return storage.setString(name, value);
//   },
//   getItem: (name) => {
//     const value = storage.getString(name);
//     return value ?? null;
//   },
//   removeItem: (name) => {
//     return storage.removeItem(name);
//   },

// };
// // import { MMKVLoader } from 'react-native-mmkv-storage';
// // import { StateStorage } from 'zustand/middleware';

// // // 1. Initialize the storage instance
// // const storage = new MMKVLoader().withInstanceID('player-storage').initialize();

// // // 2. Create the "Adapter" for Zustand
// // export const mmkvStorage: StateStorage = {
// //   setItem: (name, value) => {
// //     return storage.setString(name, value);
// //   },
// //   getItem: (name) => {
// //     const value = storage.getString(name);
// //     return value ?? null;
// //   },
// //   removeItem: (name) => {
// //     return storage.removeItem(name);
// //   },
// // };