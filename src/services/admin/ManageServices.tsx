import { FC, useState } from "react";
import {
  ServiceBrandsManagement,
  ServiceProblemManagement,
} from "./components";
import { ServiceCategoryManagement } from "./components/ServiceCategoryManagement";
import { Button, FlexBox } from "@components/general";

// const TABS = ["Categories", "Brands", "Problems"] as const;
const TABS = ["Brands", "Problems"] as const;
type TTab = (typeof TABS)[number];

export const ManageServices: FC = () => {
  const [activeTab, setActiveTab] = useState<TTab>("Brands");

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Manage Services</h1>

      <FlexBox gap={3}>
        {TABS.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "instanthub" : "ghost"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </FlexBox>

      <div className="space-y-8">
        {/* {activeTab === "Categories" && <ServiceCategoryManagement />} */}

        {activeTab === "Brands" && <ServiceBrandsManagement />}

        {activeTab === "Problems" && <ServiceProblemManagement />}
      </div>
    </div>
  );
};
