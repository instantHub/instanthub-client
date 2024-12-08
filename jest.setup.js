// import "@testing-library/jest-dom";

// Mock the Request class to prevent errors during tests
global.Request = class Request {
  constructor(input, init) {
    this.input = input;
    this.init = init;
  }

  // You can further customize this mock to return appropriate values for your tests
  // For example, mock the method like `json()`
  json() {
    return Promise.resolve({}); // You can return mock data if needed
  }
};
