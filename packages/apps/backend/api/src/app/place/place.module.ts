import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService],
  imports: [HttpModule]
})
export class PlaceModule {}
