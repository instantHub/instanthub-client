import OrderAnalyticsDashboard from "./OrderAnalyticsDashboard";

export const Dashboard_v2 = () => {
  return (
    <div>
      {import.meta.env.VITE_BUILD === "development" ? (
        <OrderAnalyticsDashboard />
      ) : (
        <h1>Statistics data under development!!</h1>
      )}
    </div>
  );
};
