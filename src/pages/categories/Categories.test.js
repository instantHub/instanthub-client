import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useGetCategoryQuery } from "../../features/api/categories/categoriesApi";
import Categories from "./Categories";
import Loading from "../../components/loader/Loading";
import ItemGrid from "../../components/ItemGrid";

// Mock the API hook
jest.mock("../../features/api", () => ({
  useGetCategoryQuery: jest.fn(),
}));

// Mock subcomponents
jest.mock("../../components/Loading", () => () => <div>Loading...</div>);
jest.mock(
  "../../components/ItemGrid",
  () =>
    ({ items, linkPath, displayBig }) =>
      (
        <div data-testid="item-grid">
          <p>Items: {items?.length || 0}</p>
          <p>Link Path: {linkPath}</p>
          <p>Display Big: {displayBig ? "True" : "False"}</p>
        </div>
      )
);

const renderComponent = () =>
  render(
    <BrowserRouter>
      <Categories />
    </BrowserRouter>
  );

describe("Categories Component", () => {
  test("renders loading state when categories are loading", () => {
    useGetCategoryQuery.mockReturnValue({
      data: null,
      categoriesLoading: true,
    });

    renderComponent();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders ItemGrid with categories when data is available", () => {
    const mockCategories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];

    useGetCategoryQuery.mockReturnValue({
      data: mockCategories,
      categoriesLoading: false,
    });

    renderComponent();

    const itemGrid = screen.getByTestId("item-grid");
    expect(itemGrid).toBeInTheDocument();
    expect(screen.getByText(/items: 2/i)).toBeInTheDocument();
    expect(
      screen.getByText(/link path: \/categories\/brands/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/display big: true/i)).toBeInTheDocument();
  });

  test("renders the recycle link correctly", () => {
    useGetCategoryQuery.mockReturnValue({
      data: [],
      categoriesLoading: false,
    });

    renderComponent();

    const recycleLink = screen.getByRole("link", { name: /CAT/i });
    expect(recycleLink).toHaveAttribute("href", "/recycle-categories");
    expect(recycleLink).toBeInTheDocument();
  });

  test("does not render ItemGrid when categories data is null", () => {
    useGetCategoryQuery.mockReturnValue({
      data: null,
      categoriesLoading: false,
    });

    renderComponent();

    expect(screen.queryByTestId("item-grid")).not.toBeInTheDocument();
  });

  test("displays the heading correctly", () => {
    useGetCategoryQuery.mockReturnValue({
      data: [],
      categoriesLoading: false,
    });

    renderComponent();

    expect(screen.getByText(/ready to sell\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(/let's turn your gadgets into cash!/i)
    ).toBeInTheDocument();
  });
});
