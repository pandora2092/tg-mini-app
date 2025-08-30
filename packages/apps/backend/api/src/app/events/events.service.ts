import { Injectable } from '@nestjs/common';
import { CityDto, EventCategoriesDto, EventDto, PlaceDto } from './dto/create-event.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from "@nestjs/axios";

const apiExternalUrl = "https://kudago.com";
const actual_since = "1754905843";

@Injectable()
export class EventsService {
  constructor(
    private readonly httpService: HttpService,
    ) {}

  async findOneEvent(id: number) : Promise<EventDto>  {
    const { data } = await firstValueFrom(
      this.httpService.get<EventDto>(`${apiExternalUrl}/public-api/v1.4/events/${id}`)
    );
    return data;
  }

  async getAllEventsByCity(city: string): Promise<EventDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<EventDto>(`${apiExternalUrl}/public-api/v1.4/events/?lang=&rufields=title,price,images,description,dates,categories,tagline,tags&location=${city}&actual_since=${actual_since}`)
    );
    return data;
  } // вероятно лишний метод

  async getAllEventsByCategories(city: string, categories: string, page: number, pageSize: number, actualSince: number, actualUntil?: number): Promise<EventDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<EventDto>(`${apiExternalUrl}/public-api/v1.4/events/?lang=ru&fields=title,price,images,description,dates,categories,tagline,tags,dates,body_text,place,id&location=${city}&actual_since=${actualSince}&&actual_until=${actualUntil}&categories=${categories}&page=${page}&page_size=${pageSize}`)
    );
    return data;
  }

  async getAllEventCategories(): Promise<EventCategoriesDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<EventCategoriesDto>(`${apiExternalUrl}/public-api/v1.4/event-categories/?lang=ru`)
    );
    return data;
  }

  async getCities(): Promise<CityDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<CityDto>(`${apiExternalUrl}/public-api/v1.4/locations`)
    );
    return data;
  }

  async getInfoPlace(place_id: string): Promise<PlaceDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<PlaceDto>(`${apiExternalUrl}/public-api/v1.4/places/${place_id}`)
    );
    return data;
  }
}
