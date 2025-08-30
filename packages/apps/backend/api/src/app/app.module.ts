import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environments';
// import { GraphQLModule } from '@nestjs/graphql';
// import { resolverMap } from './app.resolver';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ListModule } from './list/list.module';
import { EventsModule } from './events/events.module';
import { PlaceModule } from './place/place.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.connection,
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   typePaths: ['./**/*.graphql'],
    //   context: ({ req }) => ({ req }),
    //   playground: true,
    //   resolvers: [resolverMap],
    // }),
    UsersModule,
    ListModule,
    EventsModule,
    PlaceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
