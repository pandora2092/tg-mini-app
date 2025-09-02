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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   ...environment.connection,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/backend/.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'postgres' | 'mysql'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER_NAME'),
        password: config.get<string>('DB_USER_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }
    ),
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
