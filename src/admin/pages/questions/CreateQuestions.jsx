import React, { useEffect, useState } from "react";
import Condition from "./Condition";
import ConditionLabel from "./ConditionLabel";
import { useSelector } from "react-redux";
import {
  useGetConditionLabelsQuery,
  useGetConditionsQuery,
} from "../../../features/api";
import SideList from "./SideList";

const CreateQuestions = () => {
  const { data: conditionsData } = useGetConditionsQuery();
  const { data: conditionsLabelsData } = useGetConditionLabelsQuery();

  const filterCondition = useSelector((state) => state.filter.conditionsList);
  const filterConditionLabel = useSelector(
    (state) => state.filter.conditionLabelsList
  );
  //   console.log("filterCondition from CreateQuestions", filterCondition);
  //   console.log(
  //     "filterConditionLabel from CreateQuestions",
  //     filterConditionLabel
  //   );

  const conditionHeaders = ["Category", "Condition", "Page"];
  const conditionRowRenderer = (condition, index) => (
    <>
      <td className="py-2">{condition.category.name}</td>
      <td className="py-2 flex justify-start pl-2">
        <span>{index}</span>. <span>{condition.conditionName}</span>
      </td>
      <td className="py-2">{condition.page}</td>
    </>
  );

  const labelsHeaders = ["Category", "Condition", "Condition Label"];
  const labelsRowRenderer = (conditionLabel, index) => (
    <>
      <td className="py-2">{conditionLabel.category?.name}</td>
      <td className="py-2">{conditionLabel.conditionNameId?.conditionName}</td>
      <td className="py-2 flex justify-start pl-2">
        <span>{index}. </span>
        <span>{conditionLabel.conditionLabel}</span>
      </td>
    </>
  );

  // Clear filters of Conditions & Labels whenever this component loads initially
  useEffect(() => {
    console.log("object");
  }, []);

  return (
    <div className="flex flex-col items-center jus gap-10 m-10 max-sm:m-2 h-full">
      {/* Conditions */}
      <div className="flex gap-5 max-md:flex-col w-full">
        <div className="flex-1 overflow-hidden max-md:overflow-visible w-full">
          <Condition />
        </div>
        {/* Condition SideList */}
        <div className="flex-1 text-center overflow-y-auto scrollbar max-h-[380px] ">
          {filterCondition.category ? (
            <SideList
              headers={conditionHeaders}
              data={
                !filterCondition.category
                  ? conditionsData
                  : conditionsData.filter(
                      (cond) => cond.category.id === filterCondition.category
                    )
              }
              keyExtractor={(item) => item.id}
              rowRenderer={conditionRowRenderer}
            />
          ) : (
            <div className="mt-[20%]">Select Category</div>
          )}
        </div>
      </div>

      {/* ConditionLabels */}
      <div className="flex gap-5 max-md:flex-col w-full">
        <div className="flex-1 overflow-hidden max-md:overflow-visible">
          <ConditionLabel />
        </div>
        {/* ConditionLabels SideList */}
        <div className="flex-1 text-center overflow-y-auto scrollbar max-h-[380px] ">
          {filterConditionLabel.category && filterConditionLabel.condition ? (
            <SideList
              headers={labelsHeaders}
              data={
                !filterConditionLabel.category &&
                !filterConditionLabel.condition
                  ? conditionsLabelsData
                  : conditionsLabelsData.filter(
                      (cl) =>
                        cl.category?.id === filterConditionLabel.category &&
                        cl.conditionNameId?.id == filterConditionLabel.condition
                    )
              }
              keyExtractor={(item) => item.id}
              rowRenderer={labelsRowRenderer}
            />
          ) : (
            <div className="text-center mt-[20%]">
              Select Category & It's Condition
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuestions;
