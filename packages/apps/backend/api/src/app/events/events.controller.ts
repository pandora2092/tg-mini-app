import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CityDto, EventCategoriesDto, EventDto, PlaceDto } from './dto/create-event.dto';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}


  @Get('events/categories')
  async getAllEventCategories(): Promise<EventCategoriesDto> {
    return this.eventsService.getAllEventCategories();
  }

  @Get('events/:id')
  findOneEvent(@Param('id') id: string): Promise<EventDto> {
    return this.eventsService.findOneEvent(+id);
  }

  @Get('events/:city')
  async getAllEventsByCity(@Param('city') city): Promise<EventDto> {
    return this.eventsService.getAllEventsByCity(city);
  }


  @Get('events/:city/:categories/:page/:pageSize/:actualSince/:actualUntil')
  async getAllEventsByCategories(@Param('city') city, @Param('categories') categories, @Param('page') page, @Param('pageSize') pageSize, @Param('actualSince') actualSince, @Param('actualUntil') actualUntil): Promise<EventDto> {
    return this.eventsService.getAllEventsByCategories(city, categories, page, pageSize, actualSince, actualUntil);
  }

  @Get('city')
  async getCities(): Promise<CityDto> {
    return this.eventsService.getCities();
  }

  @Get('places/:placeId')
  async getInfoPlace(@Param('placeId') placeId,): Promise<PlaceDto> {
    return this.eventsService.getInfoPlace(placeId);
  }
}
