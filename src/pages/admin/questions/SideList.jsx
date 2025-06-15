const SideList = ({ headers, data, keyExtractor, rowRenderer }) => {
  //   console.log("data frin TABLE component", data);
  return (
    <table className="w-full text-sm max-sm:text-xs">
      <thead>
        <tr className="py-10 font-serif text-xl border shadow-xl text-blue-800 font-bold max-sm:text-sm">
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2 max-sm:p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center">
        {data?.map((item, index) => (
          <tr
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50 border"}
            key={keyExtractor(item, index)}
          >
            {rowRenderer(item, index + 1)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SideList;
