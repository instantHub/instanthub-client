export interface ITestimonial {
  id: string;
  name: string;
  testimonial: string;
  rating: number;
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITestimonialResponse {
  testimonials: ITestimonial[];
  totalPages: number;
  currentPage: number;
  total: number;
}
