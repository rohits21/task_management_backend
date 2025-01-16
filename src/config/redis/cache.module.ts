import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from "./redis.service";

@Module({
    imports:[
        CacheModule.register({
          
                store : redisStore,
                isGlobal: true,
                host : process.env.REDIS_HOST,
                port : +process.env.REDIS_PORT,
                ttl:60
                
            
        })
    ],
    providers:[RedisService],
    exports:[CacheModule, RedisService]
})
export class RedisCacheModule{}