export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: ["./setupTests.js"],
  //   setupFilesAfterEnv: ["./jest.setup.js"], // Ensure both setupFiles and setupFilesAfterEnv point to the same file for consistency
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js", // for images
  },
};

// Object.defineProperty(global, "importMetaEnv", {
//   value: {
//     VITE_BUILD: "development", // Adjust as needed
//   },
// });

Object.defineProperty(global, "importMetaEnv", {
  value: {
    VITE_BUILD: "development", // Adjust based on the environment you're testing
    VITE_APP_BASE_URL: "http://localhost:5173", // Example for base URL if needed
    // Add other VITE environment variables as necessary
  },
});
