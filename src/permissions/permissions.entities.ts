import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn('increment', { name: 'permid' })
  readonly permId: number

  @Column()
  readonly label: string
}

@Entity()
export class Roles {
  @PrimaryGeneratedColumn('increment', { name: 'roleid' })
  readonly roleId: number

  @Column()
  readonly perms: number

  @Column()
  readonly label: string
}
