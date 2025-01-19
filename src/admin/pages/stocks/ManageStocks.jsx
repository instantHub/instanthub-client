import React, { useState, useEffect, useRef } from "react";
import { useGetStocksQuery } from "../../../features/api";
import { Link } from "react-router-dom";
import StocksIn from "./StocksIn";
import StocksOut from "./StocksOut";
import { FaTimes } from "react-icons/fa";

export default function ManageStocks() {
  const { data: stocksData, isLoading: stocksDataLoading } =
    useGetStocksQuery();

  const [totalStocksIn, setTotalStocksIn] = useState(0);
  const [totalStocksOut, setTotalStocksOut] = useState(0);

  const [viewStocksIn, setViewStocksIn] = useState(false);
  const [viewStocksOut, setViewStocksOut] = useState(false);

  useEffect(() => {
    let countIn = 0,
      countOut = 0;
    if (!stocksDataLoading) {
      stocksData.forEach((s) => {
        if (s.status.in) countIn = countIn + 1;
        if (s.status.out) countOut = countOut + 1;
      });
    }
    setTotalStocksIn(countIn);
    setTotalStocksOut(countOut);
  }, [stocksData]);

  return (
    <div className="text-center mt-10 w-full">
      <div>
        <h1 className="text-4xl max-sm:text-xl">
          Total Stocks Count {stocksData ? stocksData.length : null}
        </h1>
      </div>
      <div className="flex justify-around">
        {/* Stock In Button */}
        <div
          onClick={() => setViewStocksIn(!viewStocksIn)}
          className="relative"
        >
          <button
            className={`${
              viewStocksIn ? `bg-red-700` : `bg-blue-700`
            }  px-6 py-3 max-sm:px-5 max-sm:py-2 text-lg max-sm:text-xs text-white rounded`}
          >
            View Stocks In
          </button>
          {viewStocksIn ? (
            <button className="absolute top-1 right-1 text-white hover:">
              <FaTimes />
            </button>
          ) : null}

          <div className="text-lg max-sm:text-xs">
            Total Stocks In {totalStocksIn}
          </div>
        </div>

        {/* Stock Out Button */}
        <div
          onClick={() => setViewStocksOut(!viewStocksOut)}
          className="relative"
        >
          <button
            className={`${
              viewStocksOut ? `bg-red-700` : `bg-blue-700`
            }  px-6 py-3 max-sm:px-5 max-sm:py-2 text-lg max-sm:text-xs text-white rounded`}
          >
            View Stocks Out
          </button>
          {viewStocksOut ? (
            <button className="absolute top-1 right-1 text-white hover:">
              <FaTimes />
            </button>
          ) : null}
          <div className="text-lg max-sm:text-xs">
            Total Stocks Out {totalStocksOut}
          </div>
        </div>
      </div>

      <div>{viewStocksIn ? <StocksIn /> : null}</div>
      <div>{viewStocksOut ? <StocksOut /> : null}</div>
    </div>
  );
}
