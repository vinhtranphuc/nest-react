import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'


import { AbstractEntity, User } from '../../../../common/entities'
import { Message } from '../../message/message.entity';
import { Invitation } from './invitation.entity';

@Entity()
export class Room extends AbstractEntity<Room> {

    @Column({
        unique: true
    })
    public name: string

    @Column({
        nullable: true
    })
    public description: string

    @Column({
        name:'is_public',
        type: 'boolean',
        default: true
    })
    public isPublic: boolean

    @ManyToMany(() => User)
    @JoinTable({
        name: "rooms_users",
        joinColumn: {
            name: "room_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    public users: User[]

    @ManyToMany(() => User)
    @JoinTable({
        name: "rooms_mods",
        joinColumn: {
            name: "room_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    public mods: User[]

    // @Column({
    //     nullable: true,
    //     name: 'owner_id'
    // })
    // public ownerId: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    public owner: User

    @OneToMany(() => Message, message => message.room, { onDelete: 'CASCADE' })
    public messages: Message[]

    @OneToMany(() => Invitation, invitation => invitation.room, { onDelete: 'CASCADE' })
    public invitations: Invitation[]
}