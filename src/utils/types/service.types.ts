export interface IServiceData {
  id: number;
  name: string;
  path: string;
  description: string;
  image: string;
}

export interface IServiceImageCarouselItem {
  id: number;
  image: string;
  title: string;
  description?: string;
  price?: string;
  features?: string[];
}
