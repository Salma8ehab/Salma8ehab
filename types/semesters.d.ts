interface SemestersApiResponse {
  data: {
    data: Semester[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
  status: number;
  message: string;
}

interface Semester {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  image_url_ar: string;
  image_url_en: string;
  created_at: string;
  updated_at: string;
  courses: Course[];
  promotion_video_url: string;
  price: number | null;
  price_after_discount: number | null;
  slug: string;
  deleted_at: string | null;
}

interface Course {
  id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  description_ar: string;
  description_en: string;
  about_ar: string | null;
  about_en: string | null;
  benefits_ar: string | null;
  benefits_en: string | null;
  course_duration: number | null;
  logo_ar: string;
  logo_en: string;
  banner_ar: string | null;
  banner_en: string | null;
  has_live: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  semester_id: string;
  index: number;
  course_type: "academic_study" | "free_study";
  price: number | null;
  price_after_discount: number | null;
  promotion_video_url: string | null;
  erp_code: string | null;
}
