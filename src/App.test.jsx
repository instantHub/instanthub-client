import React from "react";
import { render, screen, act } from "@testing-library/react";
import Brands from "./pages/brands/Brands";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import Categories from "./pages/categories/Categories";

test("renders the App component", async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Brands />
            {/* <Categories /> */}
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    );
  });

  const linkElement = screen.getByText(/Sell your Mobile for Instant Cash/i);
  // const linkElement = screen.getByText(/Let's turn your gadgets into cash!/i);
  expect(linkElement).toBeInTheDocument();
});
