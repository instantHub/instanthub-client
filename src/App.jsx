import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter as Router,
  RouterProvider,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
// Client side
import ClientLayout from "./pages/user/home/Layout";
import ClientHome from "./pages/user/home/Home";
// import ClientNavbar from "./components/Navbar";
import ClientBrands from "./pages/user/brands/Brands";
// import ClientProducts from "./pages/products/Products";
import ClientProductDetail from "./pages/user/products/ProductDetail";
import ClientProductDeductions from "./pages/user/products/questionnaire/ProductQuestions";
import ClientOtpGenerator from "./pages/user/otp/OTPGenerator";
import ClientProductFinalPrice from "./pages/user/products/ProductFinalPrice";
import ClientServices from "./pages/user/services/Services";
import ClientSubServices from "./pages/user/services/ServiceSubCategory";
import ClientServiceSubProducts from "./pages/user/services/ServiceSubProducts";
import ClientServicesBrands from "./pages/user/services/ServiceBrands";
import ClientServicesBrandsProblems from "./pages/user/services/ServiceBrandProblems";
import ClientBookService from "./pages/user/services/BookService";
import ClientRecycleCategories from "./pages/user/recycle/RecycleCategories";
import ClientRecycleBrands from "./pages/user/recycle/RecycleBrands";
// import ClientRecycleProducts from "./pages/recycle/RecycleProducts";
import ClientRecycleProductDetail from "./pages/user/recycle/RecycleProductDetails";

const ClientProducts = lazy(() => import("./pages/user/products/Products"));

// POLICIES
import ClientTermsAndPolicies from "./components/user/policies/AllTermsAndPolicies";

// Admin side
import PrivateRoute from "./components/admin/PrivateRoute";
import AdminSignIn from "./admin/pages/signIn & signup/SignIn";
import AdminSignUp from "./admin/pages/signIn & signup/SignUp";

// import UpdateAdminProfile from "./admin/components/UpdateAdmin";
// import AdminDashboard from "./admin/pages/dashboard/Dashboard";
// import AdminProducts from "./admin/pages/products/Products";
const UpdateAdminProfile = lazy(() => import("./components/admin/UpdateAdmin"));
const AdminDashboard = lazy(() => import("./admin/pages/dashboard/Dashboard"));
// const AdminProducts = lazy(() => import("./admin/pages/products/Products"));

import Admin from "./admin/Admin";
import AdminLayout from "./admin/pages/layout/Layout";

import AdminCreateProducts from "./admin/pages/products/CreateProducts";
import AdminUpdateProduct from "./admin/pages/products/UpdateProduct";
import AdminBrandsList from "./admin/pages/brands/BrandsList";
import AdminUpdateBrand from "./admin/pages/brands/UpdateBrand";
import AdminCreateBrand from "./admin/pages/brands/CreateBrand";
import AdminCategories from "./admin/pages/categories/CategoriesList";
import AdminCreateCategory from "./admin/pages/categories/CreateCategory";
import AdminCategoriesList from "./admin/pages/categories/CategoriesList";
import AdminUpdateCategory from "./admin/pages/categories/UpdateCategory";
import AdminCreateSeries from "./admin/pages/series/CreateSeries";
import AdminUpdateSeries from "./admin/pages/series/UpdateSeries";
import AdminSeriesList from "./admin/pages/series/SeriesList";
// import AdminCreateConditions from "./admin/pages/questions/old/CreateCondtions";
import AdminUpdateCondition from "./admin/pages/questions/UpdateCondition";
import AdminUpdateConditionLabel from "./admin/pages/questions/UpdateConditionLabel";
// import AdminProductsList from "./admin/pages/products/ProductsList";
// import AdminProductQuestions from "./admin/pages/products/ProductQuestionsList";

import AdminConditionsList from "./admin/pages/questions/ConditionsList";
import AdminConditionLabelsList from "./admin/pages/questions/ConditionLabelsList";
import AdminCreateSlider from "./admin/pages/sliders/CreateSlider";
import AdminSlidersList from "./admin/pages/sliders/SlidersList";
import AdminUpdateSlider from "./admin/pages/sliders/UpdateSlider";
import AdminOrdersList from "./admin/pages/orders/OrdersList";
import AdminOrderDetail from "./admin/pages/orders/OrderDetail";
import AdminPhoneNumbers from "./admin/pages/orders/PhoneNumbersList";
import AdminManageStocks from "./admin/pages/stocks/ManageStocks";
import AdminCreateCoupon from "./admin/pages/coupons/CreateCoupon";

// Services
import AdminCreateServiceForm from "./admin/pages/services/CreateServices";
import AdminServicesList from "./admin/pages/services/ServicesList";
import AdminServicesOrdersList from "./admin/pages/services/ServicesOrdersList";
import AdminServiceOrderDetail from "./admin/pages/services/ServiceOrderDetail";

// Recycle Orders
import AdminRecycleOrdersList from "./admin/pages/recycle/RecycleOrdersList";
import AdminRecycleOrderDetail from "./admin/pages/recycle/RecycleOrderDetail";

// VARIANTS QUESTIONS
import AdminCreateVariantsQuestions from "./admin/pages/variantQuestions/CreateVariantsQuestions";
import AdminUpdateVariantQuestions from "./admin/pages/variantQuestions/UpdateVariantQuestions";

// POSTS
import AdminCreatePost from "./admin/pages/posts/CreatePost";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorComponent from "./components/user/ErrorComponent";
import AboutPage from "./components/user/static/About";
import ContactUs from "./components/user/static/ContactUs";
import CreateQuestions from "./admin/pages/questions/CreateQuestions";
import Loading from "./components/user/loader/Loading";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";

// import AdminAllLaptopConfiguration from "./admin/pages/products/systemPriceDropsBackup/UpdateAllLaptopConfigurations";
// import AdminSingleLaptopConfiguration from "./admin/pages/products/systemPriceDropsBackup/UpdateSingleLaptopConfigurations";

// Helper function to wrap lazy-loaded components with Suspense
const lazyLoad = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

function App() {
  const router = Router([
    {
      path: "/",
      // errorElement: (
      //   <ErrorComponent message={`Sorry please try after sometime..!`} />
      // ),
      element: <ClientLayout />, // Google Analytics is used here
      children: [
        {
          index: true,
          errorElement: (
            <ErrorComponent message={`Sorry please try after sometime..!`} />
          ),
          element: <ClientHome />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
        {
          path: "/privacy-policies",
          element: <ClientTermsAndPolicies />,
        },
        {
          path: "/service-policy",
          element: <ClientTermsAndPolicies />,
        },
        {
          path: "/terms-conditions",
          element: <ClientTermsAndPolicies />,
        },
        {
          path: "/terms-of-use",
          element: <ClientTermsAndPolicies />,
        },

        {
          path: "/categories/brands/:catId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Brands, please try after sometime..!`}
            />
          ),
          element: <ClientBrands />,
        },

        {
          path: "/categories/brands/products/:brandId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Products, please try after sometime..!`}
            />
          ),
          element: (
            <Suspense fallback="Loading...">
              <ClientProducts />
            </Suspense>
          ),
        },
        {
          path: "/categories/brands/productDetails/:prodId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Product Details, please try after sometime..!`}
            />
          ),
          element: <ClientProductDetail />,
        },
        {
          path: "/sell/deductions",
          errorElement: (
            <ErrorComponent message={`Sorry please try after sometime..!`} />
          ),
          element: <ClientProductDeductions />,
          // children: [
          //   {
          //     path: "finalPrice",
          //     element: <ClientProductFinalPrice />,
          //   },
          // ],
        },
        {
          path: "/sell/deductions/generateOTP",
          element: <ClientOtpGenerator />,
        },
        {
          path: "/sell/deductions/finalPrice",
          element: <ClientProductFinalPrice />,
        },
        // Services
        {
          path: "/services",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Services, please try after sometime..!`}
            />
          ),
          element: <ClientServices />,
        },
        {
          path: "/services/serviceSubCategory/:serviceCategoryId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Services, please try after sometime..!`}
            />
          ),
          element: <ClientSubServices />,
        },
        {
          path: "/services/serviceSubProducts/:subServiceId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Services, please try after sometime..!`}
            />
          ),
          element: <ClientServiceSubProducts />,
        },
        {
          path: "/services/serviceBrands/:serviceCategoryId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Services, please try after sometime..!`}
            />
          ),
          element: <ClientServicesBrands />,
        },
        {
          path: "/services/serviceBrandProblems/:serviceBrandId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Services Problems, please try after sometime..!`}
            />
          ),
          element: <ClientServicesBrandsProblems />,
        },
        {
          path: "/services/book-service/:serviceId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Book-Service, please try after sometime..!`}
            />
          ),
          element: <ClientBookService />,
        },
        {
          path: "/recycle-categories",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to Recycle Categories, please try after sometime..!`}
            />
          ),
          element: <ClientRecycleCategories />,
        },
        {
          path: "/recycle-categories/recycle-brands/:catId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to Recycle Brands, please try after sometime..!`}
            />
          ),
          element: <ClientRecycleBrands />,
        },
        {
          path: "/recycle-categories/recycle-brands/recycle-products/:brandId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Products, please try after sometime..!`}
            />
          ),
          // element: <ClientRecycleProducts />,
          element: lazyLoad(() =>
            import("./pages/user/recycle/RecycleProducts")
          ),
        },
        {
          path: "/recycle-categories/recycle-brands/recycle-productDetails/:prodId",
          errorElement: (
            <ErrorComponent
              message={`Sorry unable to load Product Details, please try after sometime..!`}
            />
          ),
          element: <ClientRecycleProductDetail />,
        },
      ],
    },
    {
      path: "/admin/login",
      element: <AdminSignIn />,
    },
    {
      path: "/admin/signup",
      // element: <AdminSignUp />, // Undo for new admin registration
      element: <Navigate to="/admin/login" replace />,
    },
    {
      path: "",
      element: <PrivateRoute />,
      children: [
        {
          path: "/admin",
          element: <Admin />,

          children: [
            {
              index: true,
              element: <Navigate to="/admin/dashboard" replace />,
            },
            {
              path: "/admin/dashboard",
              element: lazyLoad(() =>
                import("./admin/pages/dashboard/Dashboard")
              ),
            },
            {
              path: "/admin/update-profile",
              element: lazyLoad(() => import("./components/admin/UpdateAdmin")),
            },
            {
              path: "/admin/add-products",
              element: <AdminCreateProducts />,
            },
            {
              path: "/admin/products-list",
              // element: <AdminProductsList />,
              element: lazyLoad(() =>
                import("./admin/pages/products/ProductsList")
              ),
            },
            {
              path: "/admin/update-product/:productId",
              element: <AdminUpdateProduct />,
            },
            {
              path: "/admin/products/product-questions/:productId",
              // element: <AdminProductQuestions />,
              element: lazyLoad(() =>
                import("./admin/pages/products/ProductQuestionsList")
              ),
            },

            // {
            //   path: "/admin/categories",
            //   element: <AdminCategories />,
            // },

            // Categories
            {
              path: "/admin/add-category",
              element: <AdminCreateCategory />,
            },
            {
              path: "/admin/categories-list",
              element: <AdminCategoriesList />,
            },
            {
              path: "/admin/update-category/:catId",
              element: <AdminUpdateCategory />,
            },

            {
              path: "/admin/add-brands",
              element: <AdminCreateBrand />,
            },
            {
              path: "/admin/brands-list",
              element: <AdminBrandsList />,
            },
            {
              path: "/admin/update-brand/:brandId",
              element: <AdminUpdateBrand />,
            },

            // Series
            {
              path: "/admin/add-series",
              element: <AdminCreateSeries />,
            },
            {
              path: "/admin/series-list",
              element: <AdminSeriesList />,
            },
            {
              path: "/admin/update-series/:seriesId",
              element: <AdminUpdateSeries />,
            },

            // Conditions
            {
              path: "/admin/create-questions",
              element: <CreateQuestions />,
              // element: <AdminCreateConditions />,
            },
            {
              path: "/admin/conditionsList",
              element: <AdminConditionsList />,
            },
            {
              path: "/admin/updateCondition/:conditionId",
              element: <AdminUpdateCondition />,
            },
            {
              path: "/admin/conditionLabelsList",
              element: <AdminConditionLabelsList />,
            },
            {
              path: "/admin/updateConditionLabel/:conditionLabelId",
              element: <AdminUpdateConditionLabel />,
            },

            // Slider
            {
              path: "/admin/add-sliders",
              element: <AdminCreateSlider />,
            },
            {
              path: "/admin/sliders-list",
              element: <AdminSlidersList />,
            },
            {
              path: "/admin/update-sliders/:sliderId",
              element: <AdminUpdateSlider />,
            },

            // Orders
            {
              path: "/admin/orders",
              element: <AdminOrdersList />,
            },
            {
              path: "/admin/order-detail/:orderId",
              element: <AdminOrderDetail />,
            },
            {
              path: "/admin/manage-stocks",
              element: <AdminManageStocks />,
            },
            {
              path: "/admin/phone-numbers",
              element: <AdminPhoneNumbers />,
            },
            {
              path: "/admin/add-coupons",
              element: <AdminCreateCoupon />,
            },

            // SERVICES
            {
              path: "/admin/add-services",
              element: <AdminCreateServiceForm />,
            },
            {
              path: "/admin/services-list",
              element: <AdminServicesList />,
            },
            {
              path: "/admin/services-orders",
              element: <AdminServicesOrdersList />,
            },
            {
              path: "/admin/serviceOrder-detail/:serviceOrderId",
              element: <AdminServiceOrderDetail />,
            },

            // Recycle Orders
            {
              path: "/admin/recycle-orders",
              element: <AdminRecycleOrdersList />,
            },
            {
              path: "/admin/recycleOrder-detail/:recycleOrderId",
              element: <AdminRecycleOrderDetail />,
            },

            // VARIANTS QUESTIONS
            {
              path: "/admin/variants-questions",
              element: <AdminCreateVariantsQuestions />,
            },
            {
              path: "/admin/update-variant-questions/:variantQuestionsId",
              element: <AdminUpdateVariantQuestions />,
            },

            // POSTS
            {
              path: "/admin/create-post",
              // element: <AdminProductQuestions />,
              element: lazyLoad(() => import("./admin/pages/posts/CreatePost")),
            },

            // Complaints
            {
              path: "/admin/complaints",
              element: lazyLoad(() =>
                import("./admin/pages/complaints/Complaints")
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <RouterProvider router={router}>
        <AnalyticsWrapper />
      </RouterProvider>
      <ToastContainer />
    </>
  );
}

const AnalyticsWrapper = () => {
  console.log("AnalyticsWrapper rendered");
  useGoogleAnalytics();
  return null; // This component only exists to run the hook
};

export default App;
