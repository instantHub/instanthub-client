import { OrderStatusLegend } from "@components/admin";
import { Button, FlexBox, StatsCard, Typography } from "@components/general";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/general/card";
import {
  useAdminProfileQuery,
  useGetExecutiveOrderCountsQuery,
} from "@features/api";
import { ProductIcon, ProfileIcon } from "@icons";
import { ROUTES } from "@routes";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { data: user } = useAdminProfileQuery();

  const { data: executiveOrderCounts } = useGetExecutiveOrderCountsQuery(
    { id: user?._id! },
    { skip: !user?._id }
  );
  console.log("executiveOrderCounts", executiveOrderCounts);

  const navigate = useNavigate();

  const navigateTo = (route: string): void => {
    navigate(route);
  };

  return (
    <FlexBox direction="col" className="gap-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle icon={<ProfileIcon className="text-blue-600" />}>
            My Profile
          </CardTitle>
          <CardDescription>
            View / Edit your profile, it will be reflected across your entire
            account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4">
          <FlexBox gap={2}>
            <Typography variant="h5">Name:</Typography>
            <Typography>{user?.name}</Typography>
          </FlexBox>
          <FlexBox gap={2}>
            <Typography variant="h5">Email:</Typography>
            <Typography>{user?.email}</Typography>
          </FlexBox>
          <FlexBox gap={2}>
            <Typography variant="h5">Phone</Typography>
            <Typography>{user?.phone}</Typography>
          </FlexBox>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="primary" shape="square" disabled>
            Edit Profile
          </Button>
        </CardFooter>
      </Card>

      <FlexBox justify="around" className="max-md:flex-col gap-10">
        <StatsCard
          icon={<ProductIcon className="h-8 w-8" />}
          title="My OverAll Orders"
          stats={[
            {
              label: "Total",
              value: executiveOrderCounts?.data.overall.total ?? "",
            },
            {
              label: "Pending",
              value: executiveOrderCounts?.data.overall.pending ?? "",
            },
            {
              label: "Completed",
              value: executiveOrderCounts?.data.overall.completed ?? "",
            },
            {
              label: "Cancelled",
              value: executiveOrderCounts?.data.overall.cancelled ?? "",
            },
          ]}
          actions={
            <Button
              variant="greenary"
              shape="square"
              // onClick={() => navigateTo(ROUTES.executive.orders)}
              onClick={() => navigateTo("/executive/orders/all")}
            >
              View All Orders
            </Button>
          }
        />
        <StatsCard
          icon={<ProductIcon className="h-8 w-8" />}
          title="Today's Orders"
          stats={[
            {
              label: "Total",
              value: executiveOrderCounts?.data.today.total ?? "",
            },
            {
              label: "Pending",
              value: executiveOrderCounts?.data.today.pending ?? "",
            },
            {
              label: "Completed",
              value: executiveOrderCounts?.data.today.completed ?? "",
            },
            {
              label: "Cancelled",
              value: executiveOrderCounts?.data.today.cancelled ?? "",
            },
          ]}
          actions={
            <Button
              variant="greenary"
              shape="square"
              onClick={() => navigateTo("/executive/orders/today")}
            >
              View Today's Orders
            </Button>
          }
        />
        <StatsCard
          icon={<ProductIcon className="h-8 w-8" />}
          title="Tomorrow's Orders"
          stats={[
            {
              label: "Total",
              value: executiveOrderCounts?.data.tomorrow.total ?? "",
            },
          ]}
          actions={
            <Button
              variant="greenary"
              shape="square"
              onClick={() => navigateTo("/executive/orders/tomorrow")}
            >
              View All Orders
            </Button>
          }
        />
      </FlexBox>
      <div className="mt-6">
        <OrderStatusLegend skip="Unassigned" />
      </div>
    </FlexBox>
  );
};
