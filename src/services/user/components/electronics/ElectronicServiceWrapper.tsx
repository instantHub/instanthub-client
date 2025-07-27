import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, FlexBox, FormInput, Typography } from "@components/general";
import { WhyChooseUs } from "@services/user/components";
import {
  IServiceBrand,
  IServiceCategory,
  IServiceProblem,
} from "@features/api/servicesApi/types";
import { DateAndTime } from "@components/user";

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
  const [dateAndTime, setDateAndTime] = useState("");

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

  const handleBrandSelect = (brand: IServiceBrand) => {
    setSelectedBrand(brand);
    setSelectedProblems([]);
    setShowForm(false);
    setTimeout(
      () => problemsRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  const toggleProblemSelect = (problem: IServiceProblem) => {
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
    console.log("handleOrderBoking");
    try {
      const data = {
        ...formData,
        selectedService: {
          category: serviceCategory,
          brand: selectedBrand,
          problems: selectedProblems,
        },
        scheduleDate: dateAndTime,
      };

      console.log("data", data);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <div className="p-4 max-w-screen-lg min-h-[500px] space-y-24 mx-auto mt-5">
      <FlexBox direction="col" gap={4}>
        <Typography variant="h2">{title}</Typography>
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
      </FlexBox>

      {selectedBrand && (
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
            <Typography variant="h6">Problems:</Typography>
            <FlexBox gap={2} justify="start" wrap="wrap">
              {selectedProblems.map((p) => (
                <Typography
                  key={p.name}
                  className="px-2 bg-instant-mid text-white p-1 rounded-lg"
                >
                  {p.name}
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
