export interface Events {
    count: number;
    next: string | null;
    previous: string | null;
    results: Event[];
}

export interface Event {
    id: number;
    slug: string;
    title:  string;
    body_text: string;
    price: string;
    favorites_count: number;
    comments_count: number;
    short_title: string;
    description: string;
    item_url: string;
    dates: {
        start: number;
        end: number;
    }[],
    disable_comments: boolean;
    ctype: string;
    place: {
        id: number;
    };
    images: {image: string, source: string}[];
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
        schedules: 
        {
            days_of_week: number[];
            start_time: number | null,
            end_time:  number | null,
        }[];
        use_place_schedule: boolean;
    };
    first_image: {
        image:  string;
        thumbnails: {
            "640x384":  string;
            "144x96":  string;
        },
        source: {
            name: string;
            link: string;
        }
    },
    age_restriction: number;
}

export interface EventCategory {
    id: number;
    slug: string;
    name: string;
}

