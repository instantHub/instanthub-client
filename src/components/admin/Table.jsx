export const Table = ({ headers, data, keyExtractor, rowRenderer }) => {
  // console.log("data from TABLE component", data);
  return (
    <table className="w-full text-sm max-sm:text-xs">
      <thead>
        <tr className="py-10 font-serif border text-lg max-sm:text-xs shadow-xl text-green-800 font-bold ">
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-4 max-sm:px-2 max-sm:py-1">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center">
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
