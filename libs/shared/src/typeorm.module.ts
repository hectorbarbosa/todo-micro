import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Global() // makes the module available globally for other modules once imported in the app modules
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      provide: DataSource, // add the datasource as a provider
      inject: [],
      useFactory: async () => {
        // using the factory function to create the datasource instance
        try {
          // console.log('postgres uri:', process.env.POSTGRES_URI)
          const dataSource = new DataSource({
            type: 'postgres',
            url: process.env.POSTGRES_URI,
            synchronize: true,
            entities: [
              join(__dirname, 'entities', '**', '*.entity.{ts,js}')            
            ], 
          });
          await dataSource.initialize(); // initialize the data source
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
