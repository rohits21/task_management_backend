import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";


@Injectable()
export class RedisService{
 constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}



 async get<T>(key:string) :Promise<T | null>{

   try {
      const value = await this.cacheManager.get<string>(key);
      console.log('CACHE MODULE :: REDIS SERVICE :: GET METHOD CALLED', { key, value });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('CACHE MODULE :: REDIS SERVICE :: GET METHOD ERROR', { key, error });
      throw new Error(`Failed to get cache value for key "${key}"`);
    }
 }


 async set<T> (key:string, value:T): Promise<void>{
   try {
      console.log('CACHE MODULE :: REDIS SERVICE :: SET METHOD CALLED', { key, value });
      await this.cacheManager.set(key, JSON.stringify(value));
      console.log('CACHE MODULE :: REDIS SERVICE :: SET METHOD SUCCESSFUL', { key });
    } catch (error) {
      console.error('CACHE MODULE :: REDIS SERVICE :: SET METHOD ERROR', { key, value, error });
      throw new Error(`Failed to set cache value for key "${key}"`);
    }
    
 }
}