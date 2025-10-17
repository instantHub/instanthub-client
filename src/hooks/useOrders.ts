import {
  useGetOrdersByStatusQuery,
  useGetOrderStatsQuery,
} from "@features/api";
import { IGetOrdersByStatusParams } from "@features/api/orders/types";
import { useMemo } from "react";

/**
 * Custom hook for order statistics with derived data
 */
export const useOrderStats = () => {
  const { data, isLoading, isError, error, refetch } = useGetOrderStatsQuery();

  const derivedStats = useMemo(() => {
    if (!data) return null;

    return {
      ...data,
      overallActive:
        data.overall.total - data.overall.completed - data.overall.cancelled,
      todayActive:
        data.today.total - data.today.completed - data.today.cancelled,
      todayAssigned: data.today.total - data.today.unassigned,
      tomorrowAssigned: data.tomorrow.total - data.tomorrow.unassigned,
    };
  }, [data]);

  return {
    stats: data,
    derivedStats,
    isLoading,
    isError,
    error,
    refetch,
  };
};

/**
 * Custom hook for orders with pagination state management
 */
export const useOrders = (params: IGetOrdersByStatusParams) => {
  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetOrdersByStatusQuery(params);

  const orders = useMemo(() => data?.orders || [], [data]);
  const pagination = useMemo(() => data?.pagination, [data]);
  const filters = useMemo(() => data?.filters, [data]);

  return {
    orders,
    pagination,
    filters,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
};
