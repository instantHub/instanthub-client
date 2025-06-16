import React, { useState, useEffect } from "react";
import { useGetCategoriesQuery, useGetStocksQuery } from "@api";
import StockCard from "./StockCard";
import ViewStock from "./ViewStock";

export const ManageStocks = () => {
  const { data: stocksData, isLoading: stocksDataLoading } =
    useGetStocksQuery();

  console.log("stocksData", stocksData);

  const { data: categoryData } = useGetCategoriesQuery();
  const [categoryImages, setCategoryImages] = useState({});
  // console.log('categoryImages',categoryImages);

  const [viewStock, setViewStock] = useState(false);
  const [selectedStock, setSelectedStock] = useState();

  const [totalStocksIn, setTotalStocksIn] = useState(0);
  const [totalStocksOut, setTotalStocksOut] = useState(0);

  const [viewStocksIn, setViewStocksIn] = useState(false);
  const [viewStocksOut, setViewStocksOut] = useState(false);

  const createButtonStyle = (buttonType) => {
    return `${
      buttonType
        ? `bg-green-700 text-white px-4 max-sm:px-2 py-3 max-sm:py-1 text-lg max-sm:text-xs`
        : `bg-white px-4 max-sm:px-2 py-2 max-sm:py-1 max-sm:text-[10px]`
    } border flex justify-center items-center gap-1 font-serif text-black rounded-md shadow-xl max-sm:shadow cursor-pointer`;
  };

  // Setting Category Images
  useEffect(() => {
    if (categoryData) {
      let images = categoryData.reduce((acc, ite) => {
        if (!acc[ite.name]) acc[ite.name] = ite.image;
        return acc;
      }, {});
      setCategoryImages(images);
    }
  }, [categoryData]);

  // Stock In & Out Count
  useEffect(() => {
    let countIn = 0,
      countOut = 0;
    if (!stocksDataLoading) {
      stocksData.forEach((s) => {
        if (s.status?.in) countIn = countIn + 1;
        if (s.status?.out) countOut = countOut + 1;
      });
    }
    setTotalStocksIn(countIn);
    setTotalStocksOut(countOut);
  }, [stocksData]);

  return (
    <>
      <div className="p-4 max-sm:p-2">
        <p className="text-center text-xl max-sm:text-sm py-2 font-serif font-semibold ">
          Total Stocks {stocksData?.length}
        </p>
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 justify-between items-center mb-5 max-sm:mb-5">
          <button
            onClick={() => {
              setViewStocksOut(false);
              setViewStocksIn(!viewStocksIn);
            }}
            className={createButtonStyle(viewStocksIn)}
          >
            <span>List Stocks In</span>
            <span className="bg-secondary text-secondary-light rounded-full px-2">
              {totalStocksIn}
            </span>
          </button>
          <button
            onClick={() => {
              setViewStocksIn(false);
              setViewStocksOut(!viewStocksOut);
            }}
            className={createButtonStyle(viewStocksOut)}
          >
            <span>List Stocks Out</span>
            <span className="bg-secondary text-secondary-light rounded-full px-2">
              {totalStocksOut}
            </span>
          </button>
        </div>

        {/* Stocks In List */}
        {viewStocksIn && (
          <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 justify-center items-center mb-5">
            {stocksData
              ?.filter((stock) => stock.status.in)
              .map((stock) => (
                <StockCard
                  key={stock.id}
                  data={stock}
                  categoryImage={
                    categoryImages[stock.productDetails.productCategory]
                  }
                  handleView={() => {
                    setViewStock(true);
                    setSelectedStock(stock);
                  }}
                />
              ))}
          </div>
          // <StocksIn />
        )}

        {/* Stocks Out List */}
        {viewStocksOut && (
          <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 justify-center items-center mb-5">
            {stocksData
              ?.filter((stock) => stock.status.out)
              .map((stock) => (
                <StockCard
                  key={stock.id}
                  data={stock}
                  categoryImage={
                    categoryImages[stock.productDetails.productCategory]
                  }
                  handleView={() => {
                    setViewStock(true);
                    setSelectedStock(stock);
                  }}
                />
              ))}
          </div>
        )}
      </div>

      {viewStock && (
        <ViewStock stock={selectedStock} setViewStock={setViewStock} />
      )}
    </>
  );
};
