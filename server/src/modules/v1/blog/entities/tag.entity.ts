import { AbstractEntity, User } from "common/entities";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Tag extends AbstractEntity<Tag> {

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn({name:'creator_id'})
    public creator: User;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn({name:'updater_id'})
    public updater: User;

    @Column({
        name: 'name',
        nullable: false,
        unique: true
    })
    public name: string;

    @ManyToMany(() => Post, post => post.tags)
    public posts?: Post[]
}