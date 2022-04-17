import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Categories, Subcategories } from './categories.entity'
import { CategoriesService } from './categories.service'

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Subcategories])],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
