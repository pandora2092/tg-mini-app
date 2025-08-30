import { PartialType } from '@nestjs/mapped-types';
import { EventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(EventDto) {}
