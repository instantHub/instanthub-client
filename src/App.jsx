import { lazy, useState } from "react";
import "./App.css";
import {
  createBrowserRouter as Router,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
// Client side
import ClientLayout from "./pages/home/Layout";
import ClientHome from "./pages/home/Home";
import ClientNavbar from "./components/Navbar";
import ClientBrands from "./pages/brands/Brands";
import ClientProducts from "./pages/products/Products";
import ClientProductDetail from "./pages/products/ProductDetail";
import ClientProductDeductions from "./pages/products/ProductQuestions";
import ClientOtpGenerator from "./pages/otp/OTPGenerator";
import ClientProductFinalPrice from "./pages/products/ProductFinalPrice";
import ClientServices from "./pages/services/Services";
import ClientSubServices from "./pages/services/ServiceSubCategory";
import ClientServiceSubProducts from "./pages/services/ServiceSubProducts";
import ClientServicesBrands from "./pages/services/ServiceBrands";
import ClientServicesBrandsProblems from "./pages/services/ServiceBrandProblems";
import ClientBookService from "./pages/services/BookService";
import ClientRecycleCategories from "./pages/recycle/RecycleCategories";
import ClientRecycleBrands from "./pages/recycle/RecycleBrands";
import ClientRecycleProducts from "./pages/recycle/RecycleProducts";
import ClientRecycleProductDetail from "./pages/recycle/RecycleProductDetails";

// POLICIES
import ClientTermsAndPolicies from "./components/policies/AllTermsAndPolicies";
// import ClientPrivacyPolicy from "./components/policies/PrivacyPolicy";
// import ClientTermsAndConditions from "./components/policies/TermsAndConditions";
// import ClientTermsOfUse from "./components/policies/TermsOfUse";
// import emailcheck from './components/'

// Admin side
import PrivateRoute from "./admin/components/PrivateRoute";
import AdminSignIn from "./admin/pages/signIn & signup/SignIn";
import AdminSignUp from "./admin/pages/signIn & signup/SignUp";

// import UpdateAdminProfile from "./admin/components/UpdateAdmin";
// import AdminDashboard from "./admin/pages/dashboard/Dashboard";
// import AdminProducts from "./admin/pages/products/Products";
const UpdateAdminProfile = lazy(() => import("./admin/components/UpdateAdmin"));
const AdminDashboard = lazy(() => import("./admin/pages/dashboard/Dashboard"));
// const AdminProducts = lazy(() => import("./admin/pages/products/Products"));

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
import AdminCreateConditions from "./admin/pages/questions/CreateCondtions";
import AdminUpdateCondition from "./admin/pages/questions/UpdateCondition";
import AdminUpdateConditionLabel from "./admin/pages/questions/UpdateConditionLabel";
import AdminProductsList from "./admin/pages/products/ProductsList";
import AdminProductQuestions from "./admin/pages/products/ProductQuestionsList";
import AdminAllLaptopConfiguration from "./admin/pages/products/systemPriceDropsBackup/UpdateAllLaptopConfigurations";
import AdminSingleLaptopConfiguration from "./admin/pages/products/systemPriceDropsBackup/UpdateSingleLaptopConfigurations";
import AdminConditionsList from "./admin/pages/questions/ConditionsList";
import AdminConditionLabelsList from "./admin/pages/questions/ConditionLabelsList";
import AdminCreateSlider from "./admin/pages/sliders/CreateSlider";
import AdminSlidersList from "./admin/pages/sliders/SlidersList";
import AdminUpdateSlider from "./admin/pages/sliders/UpdateSlider";
import AdminOrdersList from "./admin/pages/orders/OrdersList";
import AdminPhoneNumbers from "./admin/pages/orders/PhoneNumbersList";
import AdminManageStocks from "./admin/pages/stocks/ManageStocks";
import AdminCreateCoupon from "./admin/pages/coupons/CreateCoupon";
import AdminCreateServiceForm from "./admin/pages/services/CreateServices";
import AdminServicesList from "./admin/pages/services/ServicesList";
import AdminServicesOrdersList from "./admin/pages/services/ServicesOrders";
import AdminRecycleOrdersList from "./admin/pages/recycle/RecycleOrdersList";

// VARIANTS QUESTIONS
import AdminCreateVariantsQuestions from "./admin/pages/variantQuestions/CreateVariantsQuestions";
import AdminUpdateVariantQuestions from "./admin/pages/variantQuestions/UpdateVariantQuestions";

import Admin from "./admin/Admin";
import AdminLayout from "./admin/pages/layout/Layout";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorComponent from "./components/ErrorComponent";
import AboutPage from "./components/About";
import ContactUs from "./components/ContactUs";

function App() {
  const router = Router([
    {
      path: "/",
      // errorElement: (
      //   <ErrorComponent message={`Sorry please try after sometime..!`} />
      // ),
      element: <ClientLayout />,
      children: [
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
          // element: <ClientPrivacyPolicy />,
        },
        {
          path: "/terms-conditions",
          element: <ClientTermsAndPolicies />,
          // element: <ClientTermsAndConditions />,
        },
        {
          path: "/terms-of-use",
          element: <ClientTermsAndPolicies />,
          // element: <ClientTermsOfUse />,
        },
        {
          index: true,
          errorElement: (
            <ErrorComponent message={`Sorry please try after sometime..!`} />
          ),
          element: <ClientHome />,
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
          element: <ClientProducts />,
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
          element: <ClientRecycleProducts />,
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
              element: <AdminDashboard />,
            },
            {
              path: "/admin/update-profile",
              element: <UpdateAdminProfile />,
            },
            // {
            //   path: "/admin/products",
            //   element: <AdminProducts />,
            // },
            {
              path: "/admin/products-list",
              element: <AdminProductsList />,
            },
            {
              path: "/admin/add-products",
              element: <AdminCreateProducts />,
            },
            {
              path: "/admin/update-product/:productId",
              element: <AdminUpdateProduct />,
            },
            {
              path: "/admin/products/product-questions/:productId",
              element: <AdminProductQuestions />,
            },
            {
              path: "/admin/products/laptop-configurations/:productId",
              element: <AdminAllLaptopConfiguration />,
            },
            {
              path: "/admin/products/laptop-configurations/:productId",
              element: <AdminSingleLaptopConfiguration />,
            },
            {
              path: "/admin/categories",
              element: <AdminCategories />,
            },
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
            {
              path: "/admin/create-questions",
              element: <AdminCreateConditions />,
            },
            {
              path: "/admin/conditionsList",
              element: <AdminConditionsList />,
            },
            {
              path: "/admin/conditionLabelsList",
              element: <AdminConditionLabelsList />,
            },
            {
              path: "/admin/updateCondition/:conditionId",
              element: <AdminUpdateCondition />,
            },
            {
              path: "/admin/updateConditionLabel/:conditionLabelId",
              element: <AdminUpdateConditionLabel />,
            },
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
            {
              path: "/admin/orders",
              element: <AdminOrdersList />,
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
              path: "/admin/recycle-orders",
              element: <AdminRecycleOrdersList />,
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
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
