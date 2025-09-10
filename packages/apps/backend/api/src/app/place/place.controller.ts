import { Controller, Get, Body, Param } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceCategoriesDto } from './dto/create-place.dto';

@Controller()
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  findAll() {
    return this.placeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeService.findOne(+id);
  }

  @Get('place/categories')
  async getAllPlaceCategories(): Promise<PlaceCategoriesDto> {
    return this.placeService.getAllPlaceCategories();
  }
}
