export interface DestinationForm {
  title: string;
  subtitle: string;
  country: string;
  city: string;
  category_id: string;
  highlights: string;
  best_time: string;
  price_range: string;
  popularity_score: string | number;
  description: string;
  main_image: File | null;
  gallery_images: File[];
}

export interface PackageForm {
  title: string;
  subtitle: string;
  country: string;
  city: string;
  duration: string;
  price: string | number;
  included: string[];
  accommodation_json: string;
  itinerary_json: string;
  description: string;
  main_image: File | null;
  gallery_images: File[];
}

export interface HotelForm {
  title: string;
  country: string;
  city: string;
  star_rating: string;
  price_per_night: string | number;
  amenities: string[];
  room_types: string[];
  description: string;
  main_image: File | null;
  gallery_images: File[];
}
