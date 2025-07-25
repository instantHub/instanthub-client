export const ROUTES = {
  user: {
    root: "/",
    about: "/about",
    contactUs: "/contact-us",
    privacyPolicy: "/privacy-policies",
    servicePolicy: "/service-policy",
    termsConditions: "/terms-conditions",
    termsOfUse: "/terms-of-use",

    category: "/:location/:categoryUniqueURL",
    brands: "/:location/:categoryUniqueURL/brands",
    products: "/:location/:categoryUniqueURL/:brandUniqueURL",
    productDetails:
      "/:location/:categoryUniqueURL/:brandUniqueURL/:productUniqueURL",
    productDeductions: "/sell/deductions",
    productGenerateOTP: "/sell/deductions/generateOTP",
    productFinalPrice: "/sell/deductions/finalPrice",

    services: {
      root: "/services",
      interior: "interior",
    },

    recycleCategories: "/recycle/categories",
    recycleBrands: "/recycle/categories/brands/:categoryURL",
    recycleProducts: "/recycle/categories/brands/products/:brandURL",
    recycleProductDetails:
      "/recycle/categories/brands/products/productDetails/:productURL",

    acRepair: "services/ac-repair",
  },
  admin: {
    root: "/admin",
    accessDenied: "/admin/access-denied",
    login: "/admin/login",
    signIn: "/admin/signin",
    signUp: "/admin/signup",

    dashboard: "/admin/dashboard",
    updateProfile: "/admin/update-profile",

    createProduct: "/admin/add-products",
    productsList: "/admin/products-list",

    // updateProduct: "/admin/update-product/:productId",
    updateProduct: "/admin/update-product/:productSlug",

    // productQuestions: "/admin/products/product-questions/:productId",
    productQuestions: "/admin/products/product-questions/:productSlug",

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
    manageStock: "/admin/manage-stocks",

    phoneNumbers: "/admin/phone-numbers",

    createCoupon: "/admin/add-coupons",

    createService: "/admin/add-services",
    servicesList: "/admin/services-list",
    serviceOrdersList: "/admin/services-orders",
    serviceOrderDetail: "/admin/serviceOrder-detail/:serviceOrderId",

    recycleOrdersList: "/admin/recycle-orders",
    recycleOrderDetail: "/admin/recycleOrder-detail/:recycleOrderId",

    testimonial: "/admin/testimonial",

    variantsQuestions: "/admin/variants-questions",
    updateVariantQuestions:
      "/admin/update-variant-questions/:variantQuestionsId",

    createPost: "/admin/create-post",
    complaintsList: "/admin/complaints",
  },
};
