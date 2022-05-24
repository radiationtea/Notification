import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subcategories } from './categories.entities'

@Injectable()
export class CategoriesService {
  private subcategories: Repository<Subcategories>

  constructor (
    @InjectRepository(Subcategories)
      subcategories: Repository<Subcategories>
  ) {
    this.subcategories = subcategories
  }

  public getSubcategory (subId: number) {
    return this.subcategories.findOne(subId)
  }
}
