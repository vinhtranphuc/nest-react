import { AbstractEntity } from "common/entities";
import { Column, Entity, OneToMany } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Category extends AbstractEntity<Category> {

    @Column({
        unique: true
    })
    public name: string

    @Column({
        nullable: true
    })
    public description: string

    @OneToMany(() => Post, post => post.category, { onDelete: 'RESTRICT' })
    public posts: Post[]
}