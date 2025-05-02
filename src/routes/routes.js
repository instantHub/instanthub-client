export const ROUTES = {
  user: {
    root: "/",
    about: "/about",
    contactUs: "/contact-us",
    privacyPolicy: "/privacy-policies",
    servicePolicy: "/service-policy",
    termsConditions: "/terms-conditions",
    termsOfUse: "/terms-of-use",

    brands: "/categories/brands/:catId",
    products: "/categories/brands/products/:brandId",
    productDetails: "/categories/brands/productDetails/:prodId",
    productDeductions: "/sell/deductions",
    productGenerateOTP: "/sell/deductions/generateOTP",
    productFinalPrice: "/sell/deductions/finalPrice",

    services: "/services",
    serviceSubCategory: "/services/serviceSubCategory/:serviceCategoryId",
    serviceSubProducts: "/services/serviceSubProducts/:subServiceId",
    serviceBrands: "/services/serviceBrands/:serviceCategoryId",
    serviceBrandProblems: "/services/serviceBrandProblems/:serviceBrandId",
    bookService: "/services/book-service/:serviceId",
    recycleCategories: "/recycle-categories",
    recycleBrands: "/recycle-categories/recycle-brands/:catId",
    recycleProducts:
      "/recycle-categories/recycle-brands/recycle-products/:brandId",
    recycleProductDetails:
      "/recycle-categories/recycle-brands/recycle-productDetails/:prodId",
  },
  admin: {
    root: "/admin",
    login: "/admin/login",
    signIn: "/admin/signin",
    signUp: "/admin/signup",

    dashboard: "/admin/dashboard",
    updateProfile: "/admin/update-profile",

    createProduct: "/admin/add-products",
    productsList: "/admin/products-list",
    updateProduct: "/admin/update-product/:productId",
    productQuestions: "/admin/products/product-questions/:productId",

    createCategory: "/admin/add-category",
    categoriesList: "/admin/categories-list",
    updateCategory: "/admin/update-category/:catId",

    createBrand: "/admin/add-brands",
    brandsList: "/admin/brands-list",
    updateBrand: "/admin/update-brand/:brandId",

    createSeries: "/admin/add-series",
    seriesList: "/admin/series-list",
    updateSeries: "/admin/update-series/:seriesId",

    createQuestions: "/admin/create-questions",
    conditionsList: "/admin/conditionsList",
    updateCondition: "/admin/updateCondition/:conditionId",
    conditionLabelsList: "/admin/conditionLabelsList",
    updateConditionLabel: "/admin/updateConditionLabel/:conditionLabelId",

    createSlider: "/admin/add-sliders",
    slidersList: "/admin/sliders-list",
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

    variantsQuestions: "/admin/variants-questions",
    updateVariantQuestions:
      "/admin/update-variant-questions/:variantQuestionsId",

    createPost: "/admin/create-post",
    complaintsList: "/admin/complaints",
  },
};
