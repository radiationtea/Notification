import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Permission {
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

@Entity()
export class Users {
  @PrimaryColumn({ name: 'userid' })
  readonly userId: string

  @Column()
  readonly roles: number
}
