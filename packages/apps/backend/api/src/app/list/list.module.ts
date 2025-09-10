import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ListService],
  controllers: [ListController],
  imports: [HttpModule],
})
export class ListModule {}
