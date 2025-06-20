import {
  lazy,
  Suspense,
  ComponentType,
  createElement,
  FC,
  ComponentProps,
} from "react";
import { createBrowserRouter as Router, Navigate } from "react-router-dom";

import * as USER from "@pages/user";
import * as USER_COMPONENTS from "@components/user";

import * as ADMIN from "@pages/admin";
import * as ADMIN_COMPONENTS from "@components/admin";

import AdminSignIn from "@pages/admin/signIn & signup/SignIn";

import AdminCreateServiceForm from "@pages/admin/services/CreateServices";
import AdminServicesList from "@pages/admin/services/ServicesList";
import AdminServicesOrdersList from "@pages/admin/services/ServicesOrdersList";
import AdminServiceOrderDetail from "@pages/admin/services/ServiceOrderDetail";
import AdminRecycleOrdersList from "@pages/admin/recycle/RecycleOrdersList";
import AdminRecycleOrderDetail from "@pages/admin/recycle/RecycleOrderDetail";

import { ROUTES } from "./routes";

// Lazy load utility with type safety
function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
): FC<ComponentProps<T>> {
  const LazyComponent = lazy(importFunc);

  // Define the wrapper component with the inferred props of the LazyComponent
  const LazyWrapper: FC<ComponentProps<T>> = (props) => (
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
        path: ROUTES.user.category,
        element: <USER.Category />,
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
        // TODO: this is not lazy loading the component, need to fix this!
        element: createElement(
          lazyLoad(() =>
            import("@pages/user").then((module) => ({
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
        // element: <Admin />,
        element: <ADMIN.AdminLayout />,

        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.admin.dashboard} replace />,
          },
          {
            path: ROUTES.admin.dashboard,
            element: createElement(
              lazyLoad(() => import("@pages/admin/dashboard/Dashboard"))
            ),
          },
          {
            path: ROUTES.admin.updateProfile,
            element: <ADMIN_COMPONENTS.UpdateAdmin />,
          },
          {
            path: ROUTES.admin.createProduct,
            element: <ADMIN.CreateProduct />,
          },
          {
            path: ROUTES.admin.productsList,
            // element: <AdminProductsList />,
            element: createElement(
              lazyLoad(() => import("@pages/admin/products/ProductsList"))
            ),
          },
          {
            path: ROUTES.admin.updateProduct,
            element: <ADMIN.UpdateProduct />,
          },
          {
            path: ROUTES.admin.productQuestions,
            // element: <AdminProductQuestions />,
            element: createElement(
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
            element: <ADMIN.CreateSeries />,
          },
          {
            path: ROUTES.admin.updateSeries,
            element: <ADMIN.UpdateSeries />,
          },

          // Conditions
          {
            path: ROUTES.admin.createQuestions,
            element: <ADMIN.CreateQuestions />,
          },
          {
            path: ROUTES.admin.conditionsList,
            element: <ADMIN.ConditionsList />,
          },
          {
            path: ROUTES.admin.updateCondition,
            element: <ADMIN.UpdateCondition />,
          },
          {
            path: ROUTES.admin.conditionLabelsList,
            element: <ADMIN.ConditionLabelsList />,
          },
          {
            path: ROUTES.admin.updateConditionLabel,
            element: <ADMIN.UpdateConditionLabel />,
          },

          // Slider
          {
            path: ROUTES.admin.createSlider,
            element: <ADMIN.CreateSlider />,
          },
          {
            path: ROUTES.admin.updateSlider,
            element: <ADMIN.UpdateSlider />,
          },

          // Orders
          {
            path: ROUTES.admin.ordersList,
            element: <ADMIN.OrdersList />,
          },
          {
            path: ROUTES.admin.orderDetail,
            element: <ADMIN.OrderDetail />,
          },
          {
            path: ROUTES.admin.manageStock,
            element: <ADMIN.ManageStocks />,
          },
          {
            path: ROUTES.admin.phoneNumbers,
            element: <ADMIN.PhoneNumbersList />,
          },
          {
            path: ROUTES.admin.createCoupon,
            element: <ADMIN.CreateCoupon />,
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

          // Testimonials
          {
            path: ROUTES.admin.testimonial,
            element: <ADMIN.TestimonialList />,
          },

          // VARIANTS QUESTIONS
          {
            path: ROUTES.admin.variantsQuestions,
            element: <ADMIN.CreateVariantsQuestions />,
          },
          {
            path: ROUTES.admin.updateVariantQuestions,
            element: <ADMIN.UpdateVariantQuestions />,
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
