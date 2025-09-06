import { Button, FlexBox, Typography } from "@components/general";
import { useGetOrderQuery, useLazyGetProductDetailsQuery } from "@features/api";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MVBQuestions } from "./MVBQuestions";
import { PBQuestions } from "./PBQuestions";
import { ProductQuestions } from "@pages/user";

export const OrderReQuote: FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: orderDetail } = useGetOrderQuery(orderId!);
  const [
    getProductDetails,
    { data: productDetail, isLoading: loadingProductDetail },
  ] = useLazyGetProductDetailsQuery();

  console.log("re-quote orderDetail", orderDetail);
  console.log("re-quote productDetail", productDetail);

  const goBack = (): void => {
    window.history.back();
  };

  useEffect(() => {
    if (orderDetail?.productId.id) {
      getProductDetails(orderDetail?.productId.uniqueURL);
    }
  }, [orderDetail]);

  return (
    <FlexBox direction="col" gap={2} className="p-4">
      <Button variant="secondary" shape="square" size="sm" onClick={goBack}>
        Back
      </Button>
      <Typography variant="h4">Re-Quote Order</Typography>

      <Typography variant="h6">
        Order ID: {orderDetail?.orderId || "N/A"}
      </Typography>

      {/* {productDetail?.category.categoryType.multiVariants && <MVBQuestions />} */}
      {productDetail?.category.categoryType.multiVariants && (
        <ProductQuestions isReQuote={true} />
      )}
      {/* {productDetail?.category.categoryType.processorBased && <PBQuestions />} */}
      {productDetail?.category.categoryType.processorBased && (
        <ProductQuestions />
      )}
    </FlexBox>
  );
};
