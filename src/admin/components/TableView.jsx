// Table.js
import React from "react";

const Table = ({ headers, data, keyExtractor, rowRenderer }) => {
  console.log("data frin TABLE component", data);
  return (
    <table className="w-full ">
      <thead>
        <tr className="py-10 font-serif text-xl border shadow-xl text-green-800 font-bold max-sm:text-sm">
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-4 max-sm:p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center ">
        {data?.map((item, index) => (
          <tr
            // className={index % 2 === 0 ? "bg-white" : "bg-gray-100 border"}
            className="odd:bg-white even:bg-gray-100 even:border"
            key={keyExtractor(item, index)}
          >
            {rowRenderer(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
