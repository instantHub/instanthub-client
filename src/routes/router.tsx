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

import * as SERVICES from "@services/user";
import * as SERVICES_ADMIN from "@services/admin";

import AdminRecycleOrdersList from "@pages/admin/recycle/RecycleOrdersList";
import AdminRecycleOrderDetail from "@pages/admin/recycle/RecycleOrderDetail";

import { ROUTES } from "./routes";
import { ACRepair } from "@pages/user/marketing-service";
import { ADMIN_ROLE_ENUM } from "@utils/constants";

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

// lazyLoadNamed.ts
export function lazyLoadNamed<T extends ComponentType<any>>(
  importFunc: () => Promise<any>,
  exportName: string
): FC<ComponentProps<T>> {
  const LazyComponent = lazy(() =>
    importFunc().then((mod) => ({ default: mod[exportName] }))
  );

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
        path: ROUTES.user.services.root,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry unable to load Services, please try after sometime..!`}
          />
        ),
        children: [
          {
            index: true,
            element: <SERVICES.Services />,
          },
          {
            path: ROUTES.user.services.acRepair,
            element: <SERVICES.ACRepair />,
            // element: <ACRepair />,
          },
          {
            path: ROUTES.user.services.catering,
            element: <SERVICES.Catering />,
          },
          {
            path: ROUTES.user.services.carpentry,
            element: <SERVICES.Carpentry />,
          },
          {
            path: ROUTES.user.services.interior,
            element: <SERVICES.InteriorService />,
          },
          {
            path: ROUTES.user.services.mobile,
            element: <SERVICES.Mobile />,
          },
          {
            path: ROUTES.user.services.laptop,
            element: <SERVICES.Laptop />,
          },
        ],
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
    element: <ADMIN.SignIn />,
  },
  {
    path: "",
    // element: <ADMIN_COMPONENTS.PrivateRoute />,
    children: [
      {
        path: ROUTES.admin.root,
        element: (
          <ADMIN_COMPONENTS.ProtectedRoute>
            <ADMIN.AdminLayout />
          </ADMIN_COMPONENTS.ProtectedRoute>
        ),

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
            path: "admin-channel",
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.AdminListPage />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
            // element: <ADMIN.AdminRegisterForm />,
          },
          {
            path: ROUTES.admin.iconsList,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.IconsGrid />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
            // element: <ADMIN.AdminRegisterForm />,
          },

          {
            path: ROUTES.admin.updateProfile,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN_COMPONENTS.UpdateAdmin />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.createProduct,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.CreateProduct />
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.productsList,
            // element: <AdminProductsList />,
            // element: createElement(
            //   lazyLoad(() => import("@pages/admin/products/ProductsList"))
            // ),
            element: createElement(
              lazyLoadNamed(() => import("@pages/admin"), "ProductsList")
            ),
          },
          {
            path: ROUTES.admin.updateProduct,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.UpdateProduct />
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.productQuestions,
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
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.UpdateCategory />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
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
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.UpdateBrand />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },

          // Series
          {
            path: ROUTES.admin.createSeries,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.CreateSeries />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.updateSeries,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.UpdateSeries />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },

          // Conditions
          {
            path: ROUTES.admin.createQuestions,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.CreateQuestions />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.conditionsList,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.ConditionsList />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.updateCondition,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.UpdateCondition />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.conditionLabelsList,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.ConditionLabelsList />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.updateConditionLabel,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.UpdateConditionLabel />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },

          // Slider
          {
            path: ROUTES.admin.createSlider,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.MARKETING,
                ]}
              >
                <ADMIN.CreateSlider />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.updateSlider,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.MARKETING,
                ]}
              >
                <ADMIN.UpdateSlider />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },

          // Orders
          {
            path: ROUTES.admin.ordersList,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.EXECUTIVE,
                ]}
              >
                <ADMIN.OrdersList />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.orderDetail,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.EXECUTIVE,
                ]}
              >
                <ADMIN.OrderDetail />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.manageStock,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.EXECUTIVE,
                ]}
              >
                <ADMIN.ManageStocks />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.phoneNumbers,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.MARKETING,
                ]}
              >
                <ADMIN.PhoneNumbersList />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.createCoupon,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.CreateCoupon />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },

          // Recycle Orders
          {
            path: ROUTES.admin.recycleOrdersList,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.EXECUTIVE,
                ]}
              >
                <AdminRecycleOrdersList />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.recycleOrderDetail,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.EXECUTIVE,
                ]}
              >
                <AdminRecycleOrderDetail />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },

          // Testimonials
          {
            path: ROUTES.admin.testimonial,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.MARKETING,
                ]}
              >
                <ADMIN.TestimonialList />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },

          // VARIANTS QUESTIONS
          {
            path: ROUTES.admin.variantsQuestions,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.CreateVariantsQuestions />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.updateVariantQuestions,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <ADMIN.UpdateVariantQuestions />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },

          // Complaints
          {
            path: ROUTES.admin.complaintsList,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.MARKETING,
                ]}
              >
                <ADMIN.Complaints />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },

          // Services
          {
            path: ROUTES.admin.manageServices,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <SERVICES_ADMIN.ManageServices />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
          {
            path: ROUTES.admin.serviceOrders,
            element: (
              <ADMIN_COMPONENTS.RoleGuard
                allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}
              >
                <SERVICES_ADMIN.ServiceOrders />,
              </ADMIN_COMPONENTS.RoleGuard>
            ),
          },
        ],
      },
    ],
  },
]);
