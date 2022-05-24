import { Users } from 'src/users/users.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('increment', { name: 'categoryid' })
  readonly categoryId: number

  @Column()
  readonly label: string

  @Column()
  readonly manager: string

  @ManyToOne(() => Users, { eager: true })
  @JoinColumn({ referencedColumnName: 'userId', name: 'manager' })
  readonly manageUser: Users
}

@Entity({ name: 'subcate' })
export class Subcategories {
  @PrimaryGeneratedColumn('increment', { name: 'subid' })
  readonly subcategoryId: number

  @Column({ name: 'categoryid' })
  readonly parentId: number

  @Column()
  readonly label: string

  @OneToOne(() => Categories, { eager: true })
  @JoinColumn({ referencedColumnName: 'categoryId', name: 'categoryid' })
  readonly parent: Categories
}
