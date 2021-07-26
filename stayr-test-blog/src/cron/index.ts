import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { cronAddRandomWord } from './add-random-word.cron';

export const cronjob = async (event: any, context: any, callback: any) => {
  console.log(`===Cron ${event.type} ===`);

  NestFactory.createApplicationContext(AppModule)
    .then((app) => {
      switch (event.type) {
        case 'ADD_RANDOM_WORD':
          return cronAddRandomWord(app);
        default:
          break;
      }
    })
    .catch((err) => {
      console.log(`=== Cron ${event.type} fail ===`);
    });
};
