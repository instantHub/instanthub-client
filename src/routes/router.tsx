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

import * as EXECUTIVE from "@pages/executive";

import * as SERVICES from "@services/user";
import * as SERVICES_ADMIN from "@services/admin";

import AdminRecycleOrdersList from "@pages/admin/recycle/RecycleOrdersList";
import AdminRecycleOrderDetail from "@pages/admin/recycle/RecycleOrderDetail";

import { ROUTES } from "./routes";
import { ADMIN_ROLE_ENUM } from "@utils/constants";

/**
 * TODO: Using TSX Product Final Price, If everything works fine remove JSX and keep this TSX
 */
import { ProductFinalPrice2 } from "@pages/user/products/ProductFinalPrice2";
import { RoleGuard } from "src/guards";
import AdminProtectedRoute from "@pages/admin/layout/Protect";
import OrderListPage from "@pages/admin/orders/OrderListPage";
import OrdersPage from "@pages/admin/orders/OrdersPage";
import { OrderDetail2 } from "@pages/admin/orders/orderDetail/OrderDetail2";
import { ExecutiveDashboard } from "@pages/executive/dashboard/ExecutiveDashboard";
import { ExecutiveOrders } from "@pages/executive/orders/ExecutiveOrders";
import { ProductsList2 } from "@pages/admin/products/ProductsList_v2";
import { Dashboard_v2 } from "@pages/admin/dashboard";
import { PartnerRequests } from "@pages/partner";

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

const PartnerAnalytics = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
    <p className="text-gray-600">Analytics dashboard coming soon...</p>
  </div>
);

const PartnerSettings = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
    <p className="text-gray-600">Settings panel coming soon...</p>
  </div>
);

const UnauthorizedPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
      <p className="text-xl text-gray-600 mb-8">Unauthorized Access</p>
      <p className="text-gray-500">
        You don't have permission to access this resource.
      </p>
    </div>
  </div>
);

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
        path: "/blogs",
        element: <USER.BlogSystem />,
      },
      {
        path: "/blogs/:id",
        element: <USER.SelectedBlog />,
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
        element: <USER.ProductDetails_v2 />,
      },
      {
        path: ROUTES.user.productDeductions,
        errorElement: (
          <USER_COMPONENTS.ErrorComponent
            message={`Sorry please try after sometime..!`}
          />
        ),

        // TODO: ProductQuestions2 is Latest design
        element: <USER.ProductQuestions_v2 />,
        // element: <USER.ProductQuestions />,
      },
      {
        path: ROUTES.user.productFinalPrice,
        // element: <USER.ProductFinalPrice />,

        // Correct working final price component
        // element: <ProductFinalPrice2 />,

        // TODO:  ProductFinalPrice3 is the latest design
        element: <USER.ProductFinalPrice_v3 />,
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
    path: ROUTES.admin.loginPage,
    element: <ADMIN.LoginLandingPage />,
  },

  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },

  // ADMIN ROUTES
  {
    path: ROUTES.admin.root,
    element: (
      <AdminProtectedRoute>
        <ADMIN.AdminLayout />
      </AdminProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.admin.dashboard} replace />,
      },
      {
        path: ROUTES.admin.dashboard,
        // element: createElement(
        //   lazyLoad(() => import("@pages/admin/dashboard/Dashboard"))
        // ),
        element: <Dashboard_v2 />,
      },
      {
        path: "admin-channel",
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <ADMIN.AdminListPage />,
          </RoleGuard>
        ),
      },
      {
        path: "partner-requests",
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <PartnerRequests />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.iconsList,
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <ADMIN.IconsGrid />,
          </RoleGuard>
        ),
      },

      {
        path: ROUTES.admin.updateProfile,
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <ADMIN_COMPONENTS.UpdateAdmin />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.createProduct,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.CreateProduct />
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.productsList,
        // element: createElement(
        //   lazyLoadNamed(() => import("@pages/admin"), "ProductsList")
        // ),
        element: <ProductsList2 />,
      },
      {
        path: ROUTES.admin.updateProduct,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.UpdateProduct />
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.MVProductQuestions,
        element: <ADMIN.MVProductQuestionsList />,
      },
      {
        path: ROUTES.admin.PBProductQuestions,
        element: <ADMIN.PBProductQuestionsList />,
        // element: createElement(
        //   lazyLoad(
        //     () => import("@pages/admin/products/ProductQuestionsList")
        //   )
        // ),
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
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.UpdateCategory />,
          </RoleGuard>
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
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.UpdateBrand />,
          </RoleGuard>
        ),
      },

      // Series
      {
        path: ROUTES.admin.createSeries,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.CreateSeries />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.updateSeries,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.UpdateSeries />,
          </RoleGuard>
        ),
      },

      // Conditions
      {
        path: ROUTES.admin.createQuestions,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.CreateQuestions />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.conditionsList,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.ConditionsList />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.updateCondition,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.UpdateCondition />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.conditionLabelsList,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.ConditionLabelsList />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.updateConditionLabel,
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <ADMIN.UpdateConditionLabel />,
          </RoleGuard>
        ),
      },

      // Slider
      {
        path: ROUTES.admin.createSlider,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.MARKETING]}
          >
            <ADMIN.CreateSlider />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.updateSlider,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.MARKETING]}
          >
            <ADMIN.UpdateSlider />,
          </RoleGuard>
        ),
      },

      {
        path: "orders",
        children: [
          {
            index: true, // This will match /admin/orders exactly
            element: (
              <RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.EXECUTIVE,
                  ADMIN_ROLE_ENUM.MARKETING,
                ]}
              >
                <OrdersPage />
              </RoleGuard>
            ),
          },
          {
            path: ":filter", // This will match /admin/orders/:filter
            element: (
              <RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.EXECUTIVE,
                  ADMIN_ROLE_ENUM.MARKETING,
                ]}
              >
                <OrderListPage />
              </RoleGuard>
            ),
          },
          {
            path: ":orderId/order-detail",
            element: (
              <RoleGuard
                allowedRoles={[
                  ADMIN_ROLE_ENUM.ADMIN,
                  ADMIN_ROLE_ENUM.EXECUTIVE,
                  ADMIN_ROLE_ENUM.SUB_ADMIN,
                ]}
              >
                <OrderDetail2 />,
              </RoleGuard>
            ),
          },
        ],
      },

      {
        path: ROUTES.admin.orderReQuote,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.EXECUTIVE]}
          >
            <ADMIN.OrderReQuote />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.orderReQuoteCompletion,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.EXECUTIVE]}
          >
            <ADMIN.ReQuoteCompletion />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.manageStock,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.EXECUTIVE]}
          >
            <ADMIN.ManageStocks />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.phoneNumbers,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.SUB_ADMIN]}
          >
            <ADMIN.PhoneNumbersList />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.createCoupon,
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <ADMIN.CreateCoupon />,
          </RoleGuard>
        ),
      },

      // Recycle Orders
      {
        path: ROUTES.admin.recycleOrdersList,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.EXECUTIVE]}
          >
            <AdminRecycleOrdersList />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.recycleOrderDetail,
        element: (
          <RoleGuard
            allowedRoles={[ADMIN_ROLE_ENUM.ADMIN, ADMIN_ROLE_ENUM.EXECUTIVE]}
          >
            <AdminRecycleOrderDetail />,
          </RoleGuard>
        ),
      },

      // Testimonials
      {
        path: ROUTES.admin.testimonial,
        element: (
          <RoleGuard
            allowedRoles={[
              ADMIN_ROLE_ENUM.ADMIN,
              ADMIN_ROLE_ENUM.MARKETING,
              ADMIN_ROLE_ENUM.SUB_ADMIN,
            ]}
          >
            <ADMIN.TestimonialList />,
          </RoleGuard>
        ),
      },

      // VARIANTS QUESTIONS
      {
        path: ROUTES.admin.variantsQuestions,
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <ADMIN.CreateVariantsQuestions />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.updateVariantQuestions,
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <ADMIN.UpdateVariantQuestions />,
          </RoleGuard>
        ),
      },

      // Complaints
      {
        path: ROUTES.admin.marketing.complaintsList,
        element: (
          <RoleGuard
            allowedRoles={[
              ADMIN_ROLE_ENUM.ADMIN,
              ADMIN_ROLE_ENUM.MARKETING,
              ADMIN_ROLE_ENUM.SUB_ADMIN,
            ]}
          >
            <ADMIN.Complaints />,
          </RoleGuard>
        ),
      },

      // SEO
      {
        path: ROUTES.admin.marketing.seo,
        element: (
          <RoleGuard
            allowedRoles={[
              ADMIN_ROLE_ENUM.ADMIN,
              ADMIN_ROLE_ENUM.MARKETING,
              ADMIN_ROLE_ENUM.SUB_ADMIN,
            ]}
          >
            <ADMIN.MetaTags />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.marketing.metaTagList,
        element: (
          <RoleGuard
            allowedRoles={[
              ADMIN_ROLE_ENUM.ADMIN,
              ADMIN_ROLE_ENUM.MARKETING,
              ADMIN_ROLE_ENUM.SUB_ADMIN,
            ]}
          >
            <ADMIN.MetaTagsList />,
          </RoleGuard>
        ),
      },

      // Services
      {
        path: ROUTES.admin.manageServices,
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <SERVICES_ADMIN.ManageServices />,
          </RoleGuard>
        ),
      },
      {
        path: ROUTES.admin.serviceOrders,
        element: (
          <RoleGuard allowedRoles={[ADMIN_ROLE_ENUM.ADMIN]}>
            <SERVICES_ADMIN.ServiceOrders />,
          </RoleGuard>
        ),
      },
    ],
  },

  // EXECUTIVES ROUTES
  {
    path: ROUTES.executive.root,
    element: (
      <EXECUTIVE.ExecutiveProtectedRoute>
        <EXECUTIVE.ExecutiveLayout />
      </EXECUTIVE.ExecutiveProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.executive.dashboard} replace />,
      },
      {
        path: ROUTES.executive.dashboard,
        element: <ExecutiveDashboard />,
      },
      {
        path: "/executive/orders",
        element: <ExecutiveOrders />,
      },
      {
        path: ROUTES.executive.orderDetail,
        element: <OrderDetail2 />,
      },
    ],
  },
]);
