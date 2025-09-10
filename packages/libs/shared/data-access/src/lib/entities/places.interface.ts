export interface Places {
  count: number;
  next: string | null;
  previous: string | null;
  results: Event[];
}

export interface Place {
  id: number;
  slug: string;
  title: string;
  favorites_count: number;
  comments_count: number;
  description: string;
  item_url: string;
  disable_comments: boolean;
  ctype: string;
  address: string;
  location: string;
  coords: {
    lat: number;
    lon: number;
  };
  phone: string;
  is_closed: boolean;
  is_stub: boolean;
  age_restriction: null;
}

export interface PlaceCategory {
  id: number;
  slug: string;
  name: string;
}
