export class EventDto {
  id: number;
  slug: string;
  title: string;
  price: string;
  favorites_count: number;
  comments_count: number;
  description: string;
  item_url: string;
  disable_comments: boolean;
  ctype: string;
  place: string | null;
  images: { image: string; source: string }[];
  daterange: {
    start_date: number | null;
    start_time: number | null;
    start: number | null;
    end_date: number | null;
    end_time: number | null;
    end: number | null;
    is_continuous: boolean;
    is_endless: boolean;
    is_startless: boolean;
    schedules: {
      days_of_week: number[];
      start_time: number | null;
      end_time: number | null;
    }[];
    use_place_schedule: boolean;
  };
  first_image: {
    image: string;
    thumbnails: {
      '640x384': string;
      '144x96': string;
    };
    source: {
      name: string;
      link: string;
    };
  };
  age_restriction: number;
}

export class EventCategoriesDto {}

export class CityDto {
  slug: string;
  name: string;
}

export class PlaceDto {
  address: string;
  coords: {
    lat: number;
    lot: number;
  };
  id: number;
  is_closed: boolean;
  is_stub: boolean;
  location: string;
  phone: string;
  site_url: string;
  slug: string;
  subway: string;
  title: string;
}
