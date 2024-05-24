import { Module, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";
import { MagicMoversModule } from './magic-movers/magic-movers.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/database";
import { MagicItemsModule } from './magic-items/magic-items.module';
import { MissionsModule } from './missions/missions.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MagicMoversModule,
    MagicItemsModule,
    MissionsModule
  ]
})
export class AppModule implements OnModuleInit, OnApplicationBootstrap{
  onModuleInit() {
    console.log('app.module init');
  }
  onApplicationBootstrap() {
    console.log('app.module boot');
  }
}
