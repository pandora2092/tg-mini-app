import { Injectable } from '@nestjs/common';
import { PlaceCategoriesDto } from './dto/create-place.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

const apiExternalUrl = 'https://kudago.com';

@Injectable()
export class PlaceService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return `This action returns all place`;
  }

  findOne(id: number) {
    return `This action returns a #${id} place`;
  }

  async getAllPlaceCategories(): Promise<PlaceCategoriesDto> {
    const { data } = await firstValueFrom(
      this.httpService.get<PlaceCategoriesDto>(
        `${apiExternalUrl}/public-api/v1.4/place-categories/?lang=ru`,
      ),
    );
    return data;
  }
}
