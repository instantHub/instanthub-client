import React from "react";
import { useGetAllSlidersQuery } from "@api";
import SliderCard from "./SliderCard";

const SlidersList = () => {
  const { data: slidersList, isLoading: slidersLoading } =
    useGetAllSlidersQuery();

  if (!slidersLoading) {
    console.log(slidersList);
  }

  return (
    <>
      <div className="flex flex-col mt-[5%] w-[80%] mx-auto max-sm:w-[98%] font-serif">
        <h1 className="bold text-[1.4rem] text-center">Sliders List</h1>
        <div className="bg-white mt-2 mb-5">
          <div className="w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1 px-10 max-sm:px-1 mx-auto">
            {!slidersLoading &&
              slidersList.map((slider) => (
                <SliderCard key={slider.id} data={slider} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SlidersList;

{
  // <table className="w-full">
  //   <thead>
  //     <tr className="border">
  //       <th className="px-4 py-2 text-black">Slider Image</th>
  //       <th className="px-4 py-2 text-black">Slider Status</th>
  //       <th className="px-4 py-2 text-black">Update</th>
  //       <th className="px-4 py-2 text-black">Delete</th>
  //     </tr>
  //   </thead>
  //   <tbody className="text-center border">
  //     {!slidersLoading &&
  //       slidersList.map((slider, index) => (
  //         <tr key={index}>
  //           <td className="px-4 py-2">
  //             <img
  //               src={import.meta.env.VITE_APP_BASE_URL + slider.image}
  //               alt="CAT"
  //               className="w-[480px] h-[150px] mx-auto "
  //             />
  //           </td>
  //           <td className="px-4 py-2">{slider.status}</td>
  //           <td className="px-4 py-2">
  //             <Link to={}>
  //               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  //                 Edit
  //               </button>
  //             </Link>
  //           </td>
  //           <td>
  //             <button
  //               onClick={() => handleDelete(slider.id)}
  //               className="bg-red-600 text-white px-3 py-1 rounded-md"
  //             >
  //               Delete
  //             </button>
  //           </td>
  //         </tr>
  //       ))}
  //   </tbody>
  // </table>;
}
