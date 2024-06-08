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
      stocksData.map((s) => {
        if (s.stockStatus.toLowerCase().includes("in")) {
          countIn = countIn + 1;
        } else if (s.stockStatus.toLowerCase().includes("out")) {
          countOut = countOut + 1;
        }
      });
    }
    setTotalStocksIn(countIn);
    setTotalStocksOut(countOut);
  }, [stocksData]);

  return (
    <div className="text-center mt-10">
      <div>
        <h1 className="text-4xl">
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
            }  px-6 py-3  text-white rounded`}
          >
            View Stocks In
          </button>
          {viewStocksIn ? (
            <button className="absolute top-1 right-1 text-white hover:">
              <FaTimes />
            </button>
          ) : null}

          <div>Total Stocks In {totalStocksIn}</div>
        </div>

        {/* Stock Out Button */}
        <div
          onClick={() => setViewStocksOut(!viewStocksOut)}
          className="relative"
        >
          <button
            className={`${
              viewStocksOut ? `bg-red-700` : `bg-blue-700`
            }  px-6 py-3  text-white rounded`}
          >
            View Stocks Out
          </button>
          {viewStocksOut ? (
            <button className="absolute top-1 right-1 text-white hover:">
              <FaTimes />
            </button>
          ) : null}
          <div>Total Stocks Out {totalStocksOut}</div>
        </div>
      </div>

      <div>{viewStocksIn ? <StocksIn /> : null}</div>
      <div>{viewStocksOut ? <StocksOut /> : null}</div>
    </div>
  );
}
