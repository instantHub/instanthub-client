import { createBrowserRouter as Router, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Client side
import ClientLayout from "@pages/user/home/Layout";
import ClientHome from "@pages/user/home/Home";
// import ClientNavbar from "@components/Navbar";
import ClientBrands from "@pages/user/brands/Brands";
// import ClientProducts from "@pages/products/Products";
import ClientProductDetail from "@pages/user/products/ProductDetail";
import ClientProductDeductions from "@pages/user/products/questionnaire/ProductQuestions";
import ClientOtpGenerator from "@pages/user/otp/OTPGenerator";
import ClientProductFinalPrice from "@pages/user/products/ProductFinalPrice";
import ClientServices from "@pages/user/services/Services";
import ClientSubServices from "@pages/user/services/ServiceSubCategory";
import ClientServiceSubProducts from "@pages/user/services/ServiceSubProducts";
import ClientServicesBrands from "@pages/user/services/ServiceBrands";
import ClientServicesBrandsProblems from "@pages/user/services/ServiceBrandProblems";
import ClientBookService from "@pages/user/services/BookService";
import ClientRecycleCategories from "@pages/user/recycle/RecycleCategories";
import ClientRecycleBrands from "@pages/user/recycle/RecycleBrands";
// import ClientRecycleProducts from "@pages/recycle/RecycleProducts";
import ClientRecycleProductDetail from "@pages/user/recycle/RecycleProductDetails";

const ClientProducts = lazy(() => import("@pages/user/products/Products"));

// POLICIES
import ClientTermsAndPolicies from "@components/user/policies/AllTermsAndPolicies";

// Admin side
import PrivateRoute from "@components/admin/PrivateRoute";
import AdminSignIn from "@pages/admin/signIn & signup/SignIn";

// import UpdateAdminProfile from "@admin/components/UpdateAdmin";
// import AdminDashboard from "@admin/pages/dashboard/Dashboard";
// const UpdateAdminProfile = lazy(() => import("@components/admin/UpdateAdmin"));
// const AdminDashboard = lazy(() => import("@pages/admin/dashboard/Dashboard"));
// const AdminProducts = lazy(() => import("@admin/pages/products/Products"));

import Admin from "@pages/admin/Admin";

import AdminCreateProducts from "@pages/admin/products/CreateProducts";
import AdminUpdateProduct from "@pages/admin/products/UpdateProduct";
import AdminBrandsList from "@pages/admin/brands/BrandsList";
import AdminUpdateBrand from "@pages/admin/brands/UpdateBrand";
import AdminCreateBrand from "@pages/admin/brands/CreateBrand";
import AdminCreateCategory from "@pages/admin/categories/CreateCategory";
import AdminCategoriesList from "@pages/admin/categories/CategoriesList";
import AdminUpdateCategory from "@pages/admin/categories/UpdateCategory";
import AdminCreateSeries from "@pages/admin/series/CreateSeries";
import AdminUpdateSeries from "@pages/admin/series/UpdateSeries";
import AdminSeriesList from "@pages/admin/series/SeriesList";
// import AdminCreateConditions from "@admin/pages/questions/old/CreateCondtions";
import AdminUpdateCondition from "@pages/admin/questions/UpdateCondition";
import AdminUpdateConditionLabel from "@pages/admin/questions/UpdateConditionLabel";
// import AdminProductsList from "@admin/pages/products/ProductsList";
// import AdminProductQuestions from "@admin/pages/products/ProductQuestionsList";

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

// Services
import AdminCreateServiceForm from "@pages/admin/services/CreateServices";
import AdminServicesList from "@pages/admin/services/ServicesList";
import AdminServicesOrdersList from "@pages/admin/services/ServicesOrdersList";
import AdminServiceOrderDetail from "@pages/admin/services/ServiceOrderDetail";

// Recycle Orders
import AdminRecycleOrdersList from "@pages/admin/recycle/RecycleOrdersList";
import AdminRecycleOrderDetail from "@pages/admin/recycle/RecycleOrderDetail";

// VARIANTS QUESTIONS
import AdminCreateVariantsQuestions from "@pages/admin/variantQuestions/CreateVariantsQuestions";
import AdminUpdateVariantQuestions from "@pages/admin/variantQuestions/UpdateVariantQuestions";

// POSTS
import AdminCreatePost from "@pages/admin/posts/CreatePost";

import "react-toastify/dist/ReactToastify.css";
import ErrorComponent from "@components/user/ErrorComponent";
import AboutPage from "@components/user/static/About";
import ContactUs from "@components/user/static/ContactUs";
import CreateQuestions from "@pages/admin/questions/CreateQuestions";

import Loading from "@components/user/loader/Loading";
import { ROUTES } from "@routes";

const lazyLoad = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

export const router = Router([
  {
    path: ROUTES.user.root,
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
        path: ROUTES.user.about,
        element: <AboutPage />,
      },
      {
        path: ROUTES.user.contactUs,
        element: <ContactUs />,
      },
      {
        path: ROUTES.user.privacyPolicy,
        element: <ClientTermsAndPolicies />,
      },
      {
        path: ROUTES.user.servicePolicy,
        element: <ClientTermsAndPolicies />,
      },
      {
        path: ROUTES.user.termsConditions,
        element: <ClientTermsAndPolicies />,
      },
      {
        path: ROUTES.user.termsOfUse,
        element: <ClientTermsAndPolicies />,
      },

      {
        path: ROUTES.user.brands,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to load Brands, please try after sometime..!`}
          />
        ),
        element: <ClientBrands />,
      },

      {
        path: ROUTES.user.products,
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
        path: ROUTES.user.productDetails,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to load Product Details, please try after sometime..!`}
          />
        ),
        element: <ClientProductDetail />,
      },
      {
        path: ROUTES.user.productDeductions,
        errorElement: (
          <ErrorComponent message={`Sorry please try after sometime..!`} />
        ),
        element: <ClientProductDeductions />,
      },
      {
        path: ROUTES.user.productGenerateOTP,
        element: <ClientOtpGenerator />,
      },
      {
        path: ROUTES.user.productFinalPrice,
        element: <ClientProductFinalPrice />,
      },
      // Services
      {
        path: ROUTES.user.services,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to load Services, please try after sometime..!`}
          />
        ),
        element: <ClientServices />,
      },
      {
        path: ROUTES.user.serviceSubCategory,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to load Services, please try after sometime..!`}
          />
        ),
        element: <ClientSubServices />,
      },
      {
        path: ROUTES.user.serviceSubProducts,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to load Services, please try after sometime..!`}
          />
        ),
        element: <ClientServiceSubProducts />,
      },
      {
        path: ROUTES.user.serviceBrands,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to load Services, please try after sometime..!`}
          />
        ),
        element: <ClientServicesBrands />,
      },
      {
        path: ROUTES.user.serviceBrandProblems,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to load Services Problems, please try after sometime..!`}
          />
        ),
        element: <ClientServicesBrandsProblems />,
      },
      {
        path: ROUTES.user.bookService,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to load Book-Service, please try after sometime..!`}
          />
        ),
        element: <ClientBookService />,
      },
      {
        path: ROUTES.user.recycleCategories,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to Recycle Categories, please try after sometime..!`}
          />
        ),
        element: <ClientRecycleCategories />,
      },
      {
        path: ROUTES.user.recycleBrands,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to Recycle Brands, please try after sometime..!`}
          />
        ),
        element: <ClientRecycleBrands />,
      },
      {
        path: ROUTES.user.recycleProducts,
        errorElement: (
          <ErrorComponent
            message={`Sorry unable to load Products, please try after sometime..!`}
          />
        ),
        // element: <ClientRecycleProducts />,
        element: lazyLoad(() => import("@pages/user/recycle/RecycleProducts")),
      },
      {
        path: ROUTES.user.recycleProductDetails,
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
    element: <PrivateRoute />,
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
            element: lazyLoad(() => import("@pages/admin/dashboard/Dashboard")),
          },
          {
            path: ROUTES.admin.updateProfile,
            element: lazyLoad(() => import("@components/admin/UpdateAdmin")),
          },
          {
            path: ROUTES.admin.createProduct,
            element: <AdminCreateProducts />,
          },
          {
            path: ROUTES.admin.productsList,
            // element: <AdminProductsList />,
            element: lazyLoad(() =>
              import("@pages/admin/products/ProductsList")
            ),
          },
          {
            path: ROUTES.admin.updateProduct,
            element: <AdminUpdateProduct />,
          },
          {
            path: ROUTES.admin.productQuestions,
            // element: <AdminProductQuestions />,
            element: lazyLoad(() =>
              import("@pages/admin/products/ProductQuestionsList")
            ),
          },

          // Categories
          {
            path: ROUTES.admin.createCategory,
            element: <AdminCreateCategory />,
          },
          {
            path: ROUTES.admin.categoriesList,
            element: <AdminCategoriesList />,
          },
          {
            path: ROUTES.admin.updateCategory,
            element: <AdminUpdateCategory />,
          },

          // Brands
          {
            path: ROUTES.admin.createBrand,
            element: <AdminCreateBrand />,
          },
          {
            path: ROUTES.admin.brandsList,
            element: <AdminBrandsList />,
          },
          {
            path: ROUTES.admin.updateBrand,
            element: <AdminUpdateBrand />,
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
            element: lazyLoad(() => import("@pages/admin/posts/CreatePost")),
          },

          // Complaints
          {
            path: ROUTES.admin.complaintsList,
            element: lazyLoad(() =>
              import("@pages/admin/complaints/Complaints")
            ),
          },
        ],
      },
    ],
  },
]);
