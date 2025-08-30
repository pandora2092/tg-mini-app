import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [HttpModule]
})
export class EventsModule {}
