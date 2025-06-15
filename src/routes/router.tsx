import React, { lazy, Suspense, ComponentType, createElement } from "react";
import { createBrowserRouter as Router, Navigate } from "react-router-dom";

import * as USER from "@pages/user";
import * as USER_COMPONENTS from "@components/user";

import * as ADMIN from "@pages/admin";
import * as ADMIN_COMPONENTS from "@components/admin";

import AdminSignIn from "@pages/admin/signIn & signup/SignIn";
import Admin from "@pages/admin/Admin";

import AdminCreateProducts from "@pages/admin/products/CreateProducts";
import AdminUpdateProduct from "@pages/admin/products/UpdateProduct";

import AdminCreateSeries from "@pages/admin/series/CreateSeries";
import AdminUpdateSeries from "@pages/admin/series/UpdateSeries";
import AdminSeriesList from "@pages/admin/series/SeriesList";
import AdminUpdateCondition from "@pages/admin/questions/UpdateCondition";
import AdminUpdateConditionLabel from "@pages/admin/questions/UpdateConditionLabel";
import AdminConditionsList from "@pages/admin/questions/ConditionsList";
import AdminConditionLabelsList from "@pages/admin/questions/ConditionLabelsList";
import AdminCreateSlider from "@pages/admin/sliders/CreateSlider";
import AdminSlidersList from "@pages/admin/sliders/SlidersList";
import AdminUpdateSlider from "@pages/admin/sliders/UpdateSlider";
import AdminOrdersList from "@pages/admin/orders/OrdersList";
import AdminOrderDetail from "@pages/admin/orders/OrderDetail";
import AdminPhoneNumbers from "@pages/admin/orders/PhoneNumbersList";
import AdminManageStocks from "@pages/admin/stocks/ManageStocks";
import AdminCreateCoupon from "@pages/admin/coupons/CreateCoupon";
import AdminCreateServiceForm from "@pages/admin/services/CreateServices";
import AdminServicesList from "@pages/admin/services/ServicesList";
import AdminServicesOrdersList from "@pages/admin/services/ServicesOrdersList";
import AdminServiceOrderDetail from "@pages/admin/services/ServiceOrderDetail";
import AdminRecycleOrdersList from "@pages/admin/recycle/RecycleOrdersList";
import AdminRecycleOrderDetail from "@pages/admin/recycle/RecycleOrderDetail";
import AdminCreateVariantsQuestions from "@pages/admin/variantQuestions/CreateVariantsQuestions";
import AdminUpdateVariantQuestions from "@pages/admin/variantQuestions/UpdateVariantQuestions";
import CreateQuestions from "@pages/admin/questions/CreateQuestions";

import { ROUTES } from "./routes";

// Lazy load utility with type safety
function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): React.FC<React.ComponentProps<T>> {
  const LazyComponent = lazy(importFunc);

  // Define the wrapper component with the inferred props of the LazyComponent
  const LazyWrapper: React.FC<React.ComponentProps<T>> = (props) => (
    <Suspense fallback={<USER_COMPONENTS.Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return LazyWrapper;
}

export const router = Router([
  {
    path: ROUTES.user.root,
    // errorElement: (
    //   <ErrorComponent message={`Sorry please try after sometime..!`} />
    // ),
    element: <USER.Layout />, // Google Analytics is used here
    children: [
      {
        index: true,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry please try after sometime..!`}
          />
        ),
        element: <USER.Home />,
      },
      {
        path: ROUTES.user.about,
        element: <USER_COMPONENTS.AboutPage />,
      },
      {
        path: ROUTES.user.contactUs,
        element: <USER_COMPONENTS.ContactUs />,
      },
      {
        path: ROUTES.user.privacyPolicy,
        element: <USER_COMPONENTS.AllTermsAndPolicies />,
      },
      {
        path: ROUTES.user.servicePolicy,
        element: <USER_COMPONENTS.AllTermsAndPolicies />,
      },
      {
        path: ROUTES.user.termsConditions,
        element: <USER_COMPONENTS.AllTermsAndPolicies />,
      },
      {
        path: ROUTES.user.termsOfUse,
        element: <USER_COMPONENTS.AllTermsAndPolicies />,
      },

      {
        path: ROUTES.user.brands,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Brands, please try after sometime..!`}
          />
        ),
        element: <USER.Brands />,
      },

      {
        path: ROUTES.user.products,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Products, please try after sometime..!`}
          />
        ),
        element: (
          <Suspense fallback="Loading...">
            <USER.Products />
          </Suspense>
        ),
      },
      {
        path: ROUTES.user.productDetails,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Product Details, please try after sometime..!`}
          />
        ),
        element: <USER.ProductDetail />,
      },
      {
        path: ROUTES.user.productDeductions,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry please try after sometime..!`}
          />
        ),
        element: <USER.ProductQuestions />,
      },
      {
        path: ROUTES.user.productGenerateOTP,
        element: <USER.OtpGenerator />,
      },
      {
        path: ROUTES.user.productFinalPrice,
        element: <USER.ProductFinalPrice />,
      },
      // Services
      {
        path: ROUTES.user.services,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Services, please try after sometime..!`}
          />
        ),
        element: <USER.Services />,
      },
      {
        path: ROUTES.user.serviceSubCategory,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Services, please try after sometime..!`}
          />
        ),
        element: <USER.ServiceSubCategory />,
      },
      {
        path: ROUTES.user.serviceSubProducts,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Services, please try after sometime..!`}
          />
        ),
        element: <USER.ServiceSubProducts />,
      },
      {
        path: ROUTES.user.serviceBrands,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Services, please try after sometime..!`}
          />
        ),
        element: <USER.ServiceBrands />,
      },
      {
        path: ROUTES.user.serviceBrandProblems,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Services Problems, please try after sometime..!`}
          />
        ),
        element: <USER.ServiceBrandProblems />,
      },
      {
        path: ROUTES.user.bookService,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Book-Service, please try after sometime..!`}
          />
        ),
        element: <USER.BookService />,
      },
      {
        path: ROUTES.user.recycleCategories,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to Recycle Categories, please try after sometime..!`}
          />
        ),
        element: <USER.RecycleCategories />,
      },
      {
        path: ROUTES.user.recycleBrands,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to Recycle Brands, please try after sometime..!`}
          />
        ),
        element: <USER.RecycleBrands />,
      },
      {
        path: ROUTES.user.recycleProducts,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Products, please try after sometime..!`}
          />
        ),
        // element: React.createElement(
        //   // lazyLoad(() => import("@pages/user/recycle"))
        //   lazyLoad(() => import("@pages/user/recycle"))
        // ),
        element: createElement(
          lazyLoad(() =>
            import("@pages/user/recycle").then((module) => ({
              default: module.RecycleProducts,
            }))
          )
        ),
      },
      {
        path: ROUTES.user.recycleProductDetails,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Product Details, please try after sometime..!`}
          />
        ),
        element: <USER.RecycleProductDetail />,
      },
    ],
  },
  {
    path: ROUTES.admin.login,
    element: <AdminSignIn />,
  },
  {
    path: ROUTES.admin.signUp,
    // element: <AdminSignUp />, // Undo for new admin registration
    element: <Navigate to={ROUTES.admin.login} replace />,
  },
  {
    path: "",
    element: <ADMIN_COMPONENTS.PrivateRoute />,
    children: [
      {
        path: ROUTES.admin.root,
        element: <Admin />,

        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.admin.dashboard} replace />,
          },
          {
            path: ROUTES.admin.dashboard,
            element: React.createElement(
              lazyLoad(() => import("@pages/admin/dashboard/Dashboard"))
            ),
          },
          {
            path: ROUTES.admin.updateProfile,
            element: <ADMIN_COMPONENTS.UpdateAdmin />,
          },
          {
            path: ROUTES.admin.createProduct,
            element: <AdminCreateProducts />,
          },
          {
            path: ROUTES.admin.productsList,
            // element: <AdminProductsList />,
            element: React.createElement(
              lazyLoad(() => import("@pages/admin/products/ProductsList"))
            ),
          },
          {
            path: ROUTES.admin.updateProduct,
            element: <AdminUpdateProduct />,
          },
          {
            path: ROUTES.admin.productQuestions,
            // element: <AdminProductQuestions />,
            element: React.createElement(
              lazyLoad(
                () => import("@pages/admin/products/ProductQuestionsList")
              )
            ),
          },

          // Categories
          {
            path: ROUTES.admin.createCategory,
            element: <ADMIN.CreateCategory />,
          },
          {
            path: ROUTES.admin.categoriesList,
            element: <ADMIN.CategoriesList />,
          },
          {
            path: ROUTES.admin.updateCategory,
            element: <ADMIN.UpdateCategory />,
          },

          // Brands
          {
            path: ROUTES.admin.createBrand,
            element: <ADMIN.CreateBrand />,
          },
          {
            path: ROUTES.admin.brandsList,
            element: <ADMIN.BrandsList />,
          },
          {
            path: ROUTES.admin.updateBrand,
            element: <ADMIN.UpdateBrand />,
          },

          // Series
          {
            path: ROUTES.admin.createSeries,
            element: <AdminCreateSeries />,
          },
          {
            path: ROUTES.admin.seriesList,
            element: <AdminSeriesList />,
          },
          {
            path: ROUTES.admin.updateSeries,
            element: <AdminUpdateSeries />,
          },

          // Conditions
          {
            path: ROUTES.admin.createQuestions,
            element: <CreateQuestions />,
          },
          {
            path: ROUTES.admin.conditionsList,
            element: <AdminConditionsList />,
          },
          {
            path: ROUTES.admin.updateCondition,
            element: <AdminUpdateCondition />,
          },
          {
            path: ROUTES.admin.conditionLabelsList,
            element: <AdminConditionLabelsList />,
          },
          {
            path: ROUTES.admin.updateConditionLabel,
            element: <AdminUpdateConditionLabel />,
          },

          // Slider
          {
            path: ROUTES.admin.createSlider,
            element: <AdminCreateSlider />,
          },
          {
            path: ROUTES.admin.slidersList,
            element: <AdminSlidersList />,
          },
          {
            path: ROUTES.admin.updateSlider,
            element: <AdminUpdateSlider />,
          },

          // Orders
          {
            path: ROUTES.admin.ordersList,
            element: <AdminOrdersList />,
          },
          {
            path: ROUTES.admin.orderDetail,
            element: <AdminOrderDetail />,
          },
          {
            path: ROUTES.admin.manageStock,
            element: <AdminManageStocks />,
          },
          {
            path: ROUTES.admin.phoneNumbers,
            element: <AdminPhoneNumbers />,
          },
          {
            path: ROUTES.admin.createCoupon,
            element: <AdminCreateCoupon />,
          },

          // SERVICES
          {
            path: ROUTES.admin.createService,
            element: <AdminCreateServiceForm />,
          },
          {
            path: ROUTES.admin.servicesList,
            element: <AdminServicesList />,
          },
          {
            path: ROUTES.admin.serviceOrdersList,
            element: <AdminServicesOrdersList />,
          },
          {
            path: ROUTES.admin.serviceOrderDetail,
            element: <AdminServiceOrderDetail />,
          },

          // Recycle Orders
          {
            path: ROUTES.admin.recycleOrdersList,
            element: <AdminRecycleOrdersList />,
          },
          {
            path: ROUTES.admin.recycleOrderDetail,
            element: <AdminRecycleOrderDetail />,
          },

          // VARIANTS QUESTIONS
          {
            path: ROUTES.admin.variantsQuestions,
            element: <AdminCreateVariantsQuestions />,
          },
          {
            path: ROUTES.admin.updateVariantQuestions,
            element: <AdminUpdateVariantQuestions />,
          },

          // POSTS
          {
            path: ROUTES.admin.createPost,
            // element: <AdminProductQuestions />,
            element: React.createElement(
              lazyLoad(() => import("@pages/admin/posts/CreatePost"))
            ),
          },

          // Complaints
          {
            path: ROUTES.admin.complaintsList,
            element: <ADMIN.Complaints />,
          },
        ],
      },
    ],
  },
]);
