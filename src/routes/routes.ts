import { executiveApi } from "@features/api";

export const ROUTES = {
  user: {
    root: "/",
    about: "/about",
    contactUs: "/contact-us",
    privacyPolicy: "/privacy-policies",
    servicePolicy: "/service-policy",
    termsConditions: "/terms-conditions",
    termsOfUse: "/terms-of-use",

    category: "/:categoryUniqueURL",
    brands: "/:categoryUniqueURL/brands",
    products: "/:categoryUniqueURL/:brandUniqueURL",
    productDetails: "/:categoryUniqueURL/:brandUniqueURL/:productUniqueURL",
    productDeductions: "/sell/deductions",
    productGenerateOTP: "/sell/deductions/generateOTP",
    productFinalPrice: "/sell/deductions/finalPrice",

    services: {
      root: "/services",
      acRepair: "ac-repair",
      catering: "catering",
      carpentry: "carpentry",
      interior: "interior",
      laptop: "laptop-service",
      mobile: "mobile-service",
    },

    recycleCategories: "/recycle/categories",
    recycleBrands: "/recycle/categories/brands/:categoryURL",
    recycleProducts: "/recycle/categories/brands/products/:brandURL",
    recycleProductDetails:
      "/recycle/categories/brands/products/productDetails/:productURL",
  },
  admin: {
    root: "/admin",
    loginPage: "/dashboard-login",
    accessDenied: "/admin/access-denied",

    dashboard: "/admin/dashboard",
    updateProfile: "/admin/update-profile",

    createProduct: "/admin/add-products",
    productsList: "/admin/products-list",
    updateProduct: "/admin/update-product/:productSlug",

    MVProductQuestions: "/admin/products/product-questions/mv/:productSlug",
    PBProductQuestions: "/admin/products/product-questions/pb/:productSlug",

    createCategory: "/admin/add-category",
    categoriesList: "/admin/categories-list",
    updateCategory: "/admin/update-category/:categoryUniqueURL",

    createBrand: "/admin/add-brands",
    brandsList: "/admin/brands-list",
    updateBrand: "/admin/update-brand/:brandId",
    // updateBrand: "/admin/update-brand/:brandUniqueURL",

    createSeries: "/admin/add-series",
    updateSeries: "/admin/update-series/:seriesId",

    createQuestions: "/admin/create-questions",
    conditionsList: "/admin/conditionsList",
    updateCondition: "/admin/updateCondition/:conditionId",
    conditionLabelsList: "/admin/conditionLabelsList",
    updateConditionLabel: "/admin/updateConditionLabel/:conditionLabelId",

    createSlider: "/admin/add-sliders",
    updateSlider: "/admin/update-sliders/:sliderId",

    ordersList: "/admin/orders",
    orderDetail: "/admin/order-detail/:orderId",
    orderReQuote: "/admin/order-detail/:orderId/re-quote",
    orderReQuoteCompletion: "/admin/order-detail/:orderId/re-quote/completion",
    manageStock: "/admin/manage-stocks",

    phoneNumbers: "/admin/phone-numbers",

    createCoupon: "/admin/add-coupons",

    manageServices: "/admin/manage-services",
    serviceOrders: "/admin/service-orders",
    serviceOrderDetail: "/admin/serviceOrder-detail/:serviceOrderId",

    recycleOrdersList: "/admin/recycle-orders",
    recycleOrderDetail: "/admin/recycleOrder-detail/:recycleOrderId",

    testimonial: "/admin/testimonial",

    variantsQuestions: "/admin/variants-questions",
    updateVariantQuestions:
      "/admin/update-variant-questions/:variantQuestionsId",

    marketing: {
      seo: "/admin/seo",
      metaTagList: "/admin/meta-tags-list",
      createPost: "/admin/create-post",
      complaintsList: "/admin/complaints",
    },

    iconsList: "/admin/icons",
  },
  executive: {
    root: "/executive",
    dashboard: "/executive/dashboard",
    orders: "/executive/orders/:type",
    ordersToday: "/executive/orders/today",
    orderDetail: "/executive/:orderId/order-detail",
  },
};
