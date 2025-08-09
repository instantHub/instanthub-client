// import {
//   ChangeEvent,
//   FC,
//   FormEvent,
//   ReactNode,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { Button, FlexBox, FormInput, Typography } from "@components/general";
// import { WhyChooseUs } from "@services/user/components";
// import {
//   IServiceBrand,
//   IServiceCategory,
//   IServiceProblem,
// } from "@features/api/servicesApi/types";
// import { DateAndTime } from "@components/user";
// import { DESKTOP, LAPTOP, LAPTOP_DESKTOP } from "@utils/user/constants";
// import { PlusIcon } from "@icons";

// interface ElectronicServiceWrapperProps {
//   serviceCategory: IServiceCategory;
//   title: string;
//   whyChooseUsData: any[];
//   fetchBrands: (categoryId: string) => void;
//   fetchProblems: (categoryId: string) => void;
//   brands: IServiceBrand[] | undefined;
//   problems: IServiceProblem[] | undefined;
//   isLoadingBrands: boolean;
//   isLoadingProblems: boolean;
//   children?: ReactNode;
// }

// export const ElectronicServiceWrapper: FC<ElectronicServiceWrapperProps> = ({
//   serviceCategory,
//   title,
//   whyChooseUsData,
//   fetchBrands,
//   fetchProblems,
//   brands,
//   problems,
//   isLoadingBrands,
//   isLoadingProblems,
//   children,
// }) => {
//   const [selectedBrand, setSelectedBrand] = useState<IServiceBrand | null>(
//     null
//   );
//   const [selectedProblems, setSelectedProblems] = useState<IServiceProblem[]>(
//     []
//   );
//   const [showForm, setShowForm] = useState(false);

//   // const [showBrand, setShowBrand] = useState(() =>
//   //   LAPTOP_DESKTOP.includes(serviceCategory.name.toLowerCase())
//   // );

//   const showTopCat =
//     serviceCategory.name.includes(LAPTOP) ||
//     serviceCategory.name.includes(DESKTOP);

//   const [showBrand, setShowBrand] = useState(!showTopCat);
//   const [dateAndTime, setDateAndTime] = useState("");

//   const problemsRef = useRef<HTMLDivElement | null>(null);
//   const formRef = useRef<HTMLDivElement | null>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     number: "",
//     address: "",
//     "additional-info": "",
//   });

//   useEffect(() => {
//     if (serviceCategory._id) {
//       fetchBrands(serviceCategory._id);
//       fetchProblems(serviceCategory._id);
//     }
//   }, [serviceCategory]);

//   const TOP_CAT = ["Hardware", "Software", "Services"];
// const HARDWARE_DATA = [
//   "Full Laptop checkup",
//   "Laptop Cleaning",
//   "Overheating Issues",
//   "Battery Replacement",
//   "Keyboard Replacement",
//   "Display problem",
// ];
// const SOFTWARE_DATA = [
//   "RAM",
//   "Hard Disk",
//   "Windows Installation",
//   "Operating System Installation",
//   "MS Office Installation",
//   "Coral Draw Installation",
//   "Auto Cat",
//   "Other Software Installation",
// ];

//   const handleBrandSelect = (brand: IServiceBrand) => {
//     setSelectedBrand(brand);
//     setSelectedProblems([]);
//     setShowForm(false);
//     setTimeout(
//       () => problemsRef.current?.scrollIntoView({ behavior: "smooth" }),
//       100
//     );
//   };

//   const toggleProblemSelect = (problem: IServiceProblem) => {
//     setSelectedProblems((prev) =>
//       prev.find((p) => p._id === problem._id)
//         ? prev.filter((p) => p._id !== problem._id)
//         : [...prev, problem]
//     );
//   };

//   const orderForm = () => {
//     if (selectedProblems.length > 0) {
//       setShowForm(true);
//       setTimeout(
//         () => formRef.current?.scrollIntoView({ behavior: "smooth" }),
//         100
//       );
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleOrderBoking = (event: FormEvent) => {
//     event.preventDefault();
//     console.log("handleOrderBoking");
//     try {
//       const data = {
//         ...formData,
//         selectedService: {
//           category: serviceCategory,
//           brand: selectedBrand,
//           problems: selectedProblems,
//         },
//         scheduleDate: dateAndTime,
//       };

//       console.log("data", data);
//     } catch (error) {
//       console.error("Booking failed:", error);
//     }
//   };

//   return (
//     <div className="p-4 max-w-screen-lg min-h-[500px] space-y-24 mx-auto mt-5">
//       {showTopCat && (
//         <FlexBox direction="col" gap={5} fullWidth>
//           <Typography variant="h3">Select a Category to proceed</Typography>
//           <FlexBox gap={2} justify="evenly" fullWidth>
//             {TOP_CAT.map((cat) => (
//               <Button
//                 variant="ghost"
//                 size="lg"
//                 leftIcon={<PlusIcon />}
//                 className="flex gap-1 items-center text-instant-mid"
//               >
//                 <span className="inline-block">{cat}</span>
//               </Button>
//             ))}
//           </FlexBox>
//         </FlexBox>
//       )}

//       {showBrand && (
//         <FlexBox direction="col" gap={4}>
//           <Typography variant="h2">{title}</Typography>
//           <FlexBox direction="col" gap={6}>
//             <Typography variant="h5" className="text-center">
//               Kindly choose a Brand
//             </Typography>
//             <FlexBox wrap="wrap" className="gap-5 sm:gap-8">
//               {!isLoadingBrands &&
//                 brands?.map((brand) => (
//                   <div
//                     key={brand._id}
//                     className={`border min-h-[125px] rounded-xl p-2 text-center cursor-pointer transition hover:shadow-md ${
//                       selectedBrand?._id === brand._id
//                         ? "border-instant-mid border scale-110 sm:scale-125 shadow-inner"
//                         : ""
//                     }`}
//                     onClick={() => handleBrandSelect(brand)}
//                   >
//                     <img
//                       src={`${import.meta.env.VITE_APP_BASE_URL}${brand.image}`}
//                       alt={brand.name}
//                       className="w-[90px] sm:w-[110px] min-h-[90px] sm:min-h-[110px]"
//                     />
//                     <p className="text-sm font-medium">{brand.name}</p>
//                   </div>
//                 ))}
//             </FlexBox>
//           </FlexBox>
//         </FlexBox>
//       )}

//       {selectedBrand && (
//         <div ref={problemsRef} className="flex flex-col gap-5 mt-56">
//           <Typography variant="h5" className="text-center">
//             Select Problems
//           </Typography>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 sm:gap-x-24 gap-y-8 sm:gap-y-12">
//             {!isLoadingProblems &&
//               problems?.map((problem) => (
//                 <div
//                   key={problem._id}
//                   className={`flex max-md:flex-col gap-2 items-center border rounded-xl p-2 text-center cursor-pointer transition hover:shadow-md ${
//                     selectedProblems.some((p) => p._id === problem._id)
//                       ? "border-instant-mid border scale-110 sm:scale-125 shadow-inner"
//                       : ""
//                   }`}
//                   onClick={() => toggleProblemSelect(problem)}
//                 >
//                   <img
//                     src={`${import.meta.env.VITE_APP_BASE_URL}${problem.image}`}
//                     alt={problem.name}
//                     className="w-[75px] sm:w-[90px] min-h-[75px] sm:min-h-[70px]"
//                   />
//                   <Typography>{problem.name}</Typography>
//                 </div>
//               ))}
//           </div>
//           <div className="text-center">
//             <Button
//               variant="instanthub"
//               onClick={orderForm}
//               disabled={selectedProblems.length === 0}
//             >
//               Book Order
//             </Button>
//           </div>
//         </div>
//       )}

//       {showForm && (
//         <div ref={formRef} className="max-w-lg mx-auto space-y-4">
//           <h3 className="text-lg font-semibold text-center">
//             Enter Your Details
//           </h3>
//           <div className="bg-gray-100 p-4 rounded-lg space-y-2">
//             <FlexBox justify="start" gap={2}>
//               <Typography variant="h6">Selected Brand:</Typography>
//               <Typography variant="h5">{selectedBrand?.name}</Typography>
//             </FlexBox>
//             <Typography variant="h6">Problems:</Typography>
//             <FlexBox gap={2} justify="start" wrap="wrap">
//               {selectedProblems.map((p) => (
//                 <Typography
//                   key={p.name}
//                   className="px-2 bg-instant-mid text-white p-1 rounded-lg"
//                 >
//                   {p.name}
//                 </Typography>
//               ))}
//             </FlexBox>
//           </div>
//           <form onSubmit={handleOrderBoking} className="flex flex-col gap-2">
//             <FormInput
//               name="name"
//               value={formData.name}
//               label="Full Name"
//               placeholder="Full Name"
//               onChange={handleChange}
//               required
//             />
//             <FormInput
//               name="number"
//               type="number"
//               value={formData.number}
//               label="Phone Number"
//               placeholder="Phone Number"
//               onChange={handleChange}
//               required
//             />
//             <FormInput
//               name="email"
//               type="email"
//               value={formData.email}
//               label="Email"
//               placeholder="Email"
//               onChange={handleChange}
//             />
//             <FormInput
//               name="address"
//               value={formData.address}
//               label="Address"
//               placeholder="Enter your Address"
//               onChange={handleChange}
//               required
//             />
//             <FormInput
//               name="additional-info"
//               value={formData.address}
//               label="Description any additional problems:"
//               placeholder="Additional Problems / Info"
//               onChange={handleChange}
//               required
//             />
//             <DateAndTime setSchedule={setDateAndTime} />
//             <Button type="submit" variant="instanthub" fullWidth>
//               Confirm Order
//             </Button>
//           </form>
//         </div>
//       )}

//       <WhyChooseUs
//         title="Why we are best at InstantHub"
//         data={whyChooseUsData}
//       />

//       {children}
//     </div>
//   );
// };

import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  Checkbox,
  FlexBox,
  FormInput,
  Typography,
} from "@components/general";
import { WhyChooseUs } from "@services/user/components";
import {
  IServiceBrand,
  IServiceCategory,
  IServiceProblem,
} from "@features/api/servicesApi/types";
import { DateAndTime } from "@components/user";
import { DESKTOP, LAPTOP, MOBILE } from "@utils/user/constants";
import { PlusIcon } from "@icons";

interface ElectronicServiceWrapperProps {
  serviceCategory: IServiceCategory;
  title: string;
  whyChooseUsData: any[];
  fetchBrands: (categoryId: string) => void;
  fetchProblems: (categoryId: string) => void;
  brands: IServiceBrand[] | undefined;
  problems: IServiceProblem[] | undefined;
  isLoadingBrands: boolean;
  isLoadingProblems: boolean;
  children?: ReactNode;
}

const TOP_CAT = ["Hardware", "Software", "Services"];

const HARDWARE_DATA = [
  "Full Laptop checkup",
  "Laptop Cleaning",
  "Overheating Issues",
  "Battery Replacement",
  "Keyboard Replacement",
  "Display problem",
];

const SOFTWARE_DATA = [
  "RAM",
  "Hard Disk",
  "Windows Installation",
  "Operating System Installation",
  "MS Office Installation",
  "Coral Draw Installation",
  "Auto Cat",
  "Other Software Installation",
];

export const ElectronicServiceWrapper: FC<ElectronicServiceWrapperProps> = ({
  serviceCategory,
  title,
  whyChooseUsData,
  fetchBrands,
  fetchProblems,
  brands,
  problems,
  isLoadingBrands,
  isLoadingProblems,
  children,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<IServiceBrand | null>(
    null
  );
  const [selectedProblems, setSelectedProblems] = useState<IServiceProblem[]>(
    []
  );
  const [showForm, setShowForm] = useState(false);
  const [selectedTopCat, setSelectedTopCat] = useState<string | null>(null);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [dateAndTime, setDateAndTime] = useState("");

  const showTopCat =
    serviceCategory.name.includes(LAPTOP) ||
    serviceCategory.name.includes(DESKTOP);
  const mobileService = serviceCategory.name.includes(MOBILE);

  // const [showBrand, setShowBrand] = useState(false);
  const [showBrand, setShowBrand] = useState(mobileService);

  const problemsRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    "additional-info": "",
  });

  useEffect(() => {
    if (serviceCategory._id) {
      fetchBrands(serviceCategory._id);
      fetchProblems(serviceCategory._id);
    }
  }, [serviceCategory]);

  const handleTopCatSelect = (cat: string) => {
    setSelectedTopCat(cat);
    setSelectedRequests([]);
    setSelectedBrand(null);
    setSelectedProblems([]);
    setShowForm(false);
    if (cat === "Services") {
      setShowBrand(true);
    } else {
      setShowBrand(false);
    }
  };

  const handleRequestChange = (item: string) => {
    setSelectedRequests((prev) =>
      prev.includes(item) ? prev.filter((r) => r !== item) : [...prev, item]
    );
  };

  const handleBrandSelect = (brand: IServiceBrand) => {
    setSelectedBrand(brand);
    if (!showTopCat) {
      setSelectedBrand(brand);
      setSelectedProblems([]);
      setShowForm(false);
      setTimeout(
        () => problemsRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
      return;
    }

    if (selectedTopCat === "Services") {
      setSelectedProblems([]);
      setShowForm(false);
      setTimeout(
        () => problemsRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    } else {
      setShowForm(true);
      setTimeout(
        () => formRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    }
  };

  const toggleProblemSelect = (problem: IServiceProblem) => {
    console.log("toggleProblemSelect", problem);
    setSelectedProblems((prev) =>
      prev.find((p) => p._id === problem._id)
        ? prev.filter((p) => p._id !== problem._id)
        : [...prev, problem]
    );
  };

  const orderForm = () => {
    if (selectedProblems.length > 0) {
      setShowForm(true);
      setTimeout(
        () => formRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderBoking = (event: FormEvent) => {
    event.preventDefault();
    try {
      const data = {
        ...formData,
        selectedService: {
          category: serviceCategory,
          brand: selectedBrand,
          problems:
            selectedTopCat === "Services" ? selectedProblems : selectedRequests,
        },
        scheduleDate: dateAndTime,
      };
      console.log("Booking Data:", data);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="p-4 max-w-screen-lg min-h-[500px] space-y-16 mx-auto mt-5">
      <Typography variant="h2" className="text-center">
        {title}
      </Typography>

      {showTopCat && (
        <FlexBox direction="col" gap={5} fullWidth>
          <Typography variant="h3">Select a Category to proceed</Typography>
          <FlexBox gap={2} justify="evenly" fullWidth>
            {TOP_CAT.map((cat) => (
              <Button
                key={cat}
                variant={selectedTopCat === cat ? "instanthub" : "ghost"}
                size="lg"
                leftIcon={<PlusIcon />}
                className="flex gap-1 items-center text-instant-mid"
                onClick={() => handleTopCatSelect(cat)}
              >
                <span className="inline-block">{cat}</span>
              </Button>
            ))}
          </FlexBox>
        </FlexBox>
      )}

      {(selectedTopCat === "Hardware" || selectedTopCat === "Software") && (
        <FlexBox direction="col" gap={5}>
          <Typography variant="h4">Select {selectedTopCat} Issues</Typography>
          {/* <FlexBox wrap="wrap" gap={4}> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-24 gap-y-6 sm:gap-y-10">
            {(selectedTopCat === "Hardware"
              ? HARDWARE_DATA
              : SOFTWARE_DATA
            ).map((item) => (
              <Checkbox
                key={item}
                id={item}
                label={item}
                name={item}
                checked={selectedRequests.includes(item)}
                onChange={() => handleRequestChange(item)}
              />
            ))}
          </div>
          {/* </FlexBox> */}

          {selectedRequests.length > 0 && (
            <Button variant="instanthub" onClick={() => setShowBrand(true)}>
              Next: Choose Brand
            </Button>
          )}
        </FlexBox>
      )}

      {showBrand && (
        <FlexBox direction="col" gap={6}>
          <Typography variant="h5" className="text-center">
            Kindly choose a Brand
          </Typography>
          <FlexBox wrap="wrap" className="gap-5 sm:gap-8">
            {!isLoadingBrands &&
              brands?.map((brand) => (
                <div
                  key={brand._id}
                  className={`border min-h-[125px] rounded-xl p-2 text-center cursor-pointer transition hover:shadow-md ${
                    selectedBrand?._id === brand._id
                      ? "border-instant-mid border scale-110 sm:scale-125 shadow-inner"
                      : ""
                  }`}
                  onClick={() => handleBrandSelect(brand)}
                >
                  <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}${brand.image}`}
                    alt={brand.name}
                    className="w-[90px] sm:w-[110px] min-h-[90px] sm:min-h-[110px]"
                  />
                  <p className="text-sm font-medium">{brand.name}</p>
                </div>
              ))}
          </FlexBox>
        </FlexBox>
      )}

      {/* {selectedBrand && selectedTopCat === "Services" && ( */}
      {selectedBrand && (mobileService || selectedTopCat === "Services") && (
        <div ref={problemsRef} className="flex flex-col gap-5 mt-56">
          <Typography variant="h5" className="text-center">
            Select Problems
          </Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 sm:gap-x-24 gap-y-8 sm:gap-y-12">
            {!isLoadingProblems &&
              problems?.map((problem) => (
                <div
                  key={problem._id}
                  className={`flex max-md:flex-col gap-2 items-center border rounded-xl p-2 text-center cursor-pointer transition hover:shadow-md ${
                    selectedProblems.some((p) => p._id === problem._id)
                      ? "border-instant-mid border scale-110 sm:scale-125 shadow-inner"
                      : ""
                  }`}
                  onClick={() => toggleProblemSelect(problem)}
                >
                  <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}${problem.image}`}
                    alt={problem.name}
                    className="w-[75px] sm:w-[90px] min-h-[75px] sm:min-h-[70px]"
                  />
                  <Typography>{problem.name}</Typography>
                </div>
              ))}
          </div>
          <div className="text-center">
            <Button
              variant="instanthub"
              onClick={orderForm}
              disabled={selectedProblems.length === 0}
            >
              Book Order
            </Button>
          </div>
        </div>
      )}

      {showForm && (
        <div ref={formRef} className="max-w-lg mx-auto space-y-4">
          <h3 className="text-lg font-semibold text-center">
            Enter Your Details
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <FlexBox justify="start" gap={2}>
              <Typography variant="h6">Selected Brand:</Typography>
              <Typography variant="h5">{selectedBrand?.name}</Typography>
            </FlexBox>
            <Typography variant="h6">Selected Requests:</Typography>
            <FlexBox gap={2} justify="start" wrap="wrap">
              {(selectedTopCat === "Services" || mobileService
                ? selectedProblems.map((p) => p.name)
                : selectedRequests
              ).map((item) => (
                <Typography
                  key={item}
                  className="px-2 bg-instant-mid text-white p-1 rounded-lg"
                >
                  {item}
                </Typography>
              ))}
            </FlexBox>
          </div>
          <form onSubmit={handleOrderBoking} className="flex flex-col gap-2">
            <FormInput
              name="name"
              value={formData.name}
              label="Full Name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <FormInput
              name="number"
              type="number"
              value={formData.number}
              label="Phone Number"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
            <FormInput
              name="email"
              type="email"
              value={formData.email}
              label="Email"
              placeholder="Email"
              onChange={handleChange}
            />
            <FormInput
              name="address"
              value={formData.address}
              label="Address"
              placeholder="Enter your Address"
              onChange={handleChange}
              required
            />
            <FormInput
              name="additional-info"
              value={formData.address}
              label="Description any additional problems:"
              placeholder="Additional Problems / Info"
              onChange={handleChange}
              required
            />
            {/* @ts-ignore */}
            <DateAndTime setSchedule={setDateAndTime} />
            <Button type="submit" variant="instanthub" fullWidth>
              Confirm Order
            </Button>
          </form>
        </div>
      )}

      <WhyChooseUs
        title="Why we are best at InstantHub"
        data={whyChooseUsData}
      />

      {children}
    </div>
  );
};
