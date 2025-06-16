import React, { useEffect, useState } from "react";
import { CreateCondtions } from "./conditions";
import { CreateConditionLabels } from "./conditionLabels";
import { useSelector } from "react-redux";
import { useGetConditionsQuery, useGetConditionLabelsQuery } from "@api";
import { SideList } from "./components";

export const CreateQuestions = () => {
  const { data: conditionsData } = useGetConditionsQuery();
  console.log("conditionsData", conditionsData);
  const { data: conditionsLabelsData } = useGetConditionLabelsQuery();

  const filterCondition = useSelector((state) => state.filter.conditionsList);
  const filterConditionLabel = useSelector(
    (state) => state.filter.conditionLabelsList
  );

  const conditionHeaders = [
    "Category",
    "Condition",
    "keyword",
    "Configurations",
  ];
  const conditionRowRenderer = (condition, index) => (
    <>
      <td className="py-2">{condition.category.name}</td>
      <td className="py-2 flex flex-col justify-center items-center">
        <span>{condition.conditionName}</span>
        <b>Page No. {condition.page}</b>
      </td>

      <td className="py-2">{condition.keyword}</td>
      <td className="flex flex-col py-2">
        <span>{condition.isMandatory ? "Mandatory" : "Not Mandatory"}</span>
        <span>
          {condition.multiSelect ? "Multi Select" : "Not Multi Select"}
        </span>
        <span>{condition.isYesNoType ? "Yes No Type" : "Not Yes No Type"}</span>
        <span>
          {condition.showLabelsImage ? "Show Image" : "Don't Show Image"}
        </span>
      </td>
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
          <CreateCondtions />
        </div>
        {/* Condition SideList */}
        <div className="flex-1 text-center overflow-y-auto scrollbar max-h-[380px]">
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
          <CreateConditionLabels />
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
