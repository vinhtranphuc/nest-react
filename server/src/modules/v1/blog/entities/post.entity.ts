import { AbstractEntity, User } from "common/entities";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Category } from "./category.entity";
import { Comment } from "./comment.entity";
import { Tag } from "./tag.entity";

@Entity()
export class Post extends AbstractEntity<Post>{

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn({name:'creator_id'})
    public creator: User;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn({name:'updater_id'})
    public updater: User;

    @ManyToOne(() => Category, category => category.posts, { onDelete: 'RESTRICT', nullable: true })
    @JoinColumn({ name: "category_id" })
    public category: Category;

    @OneToMany(() => Comment, comment => comment.post, { onDelete: 'CASCADE' })
    public comments: Comment[]

    @Column({
        name: 'title',
        nullable: false
    })
    public title: string;

    @Column({
        name: 'summary',
        nullable: true
    })
    public summary: string;

    @Column({
        name: 'content',
        nullable: false
    })
    public content: string;

    @Column("varchar",{
        name: 'images',
        nullable: true,
        array: true
    })
    public images: string[];

    @Column("varchar",{
        name: 'files',
        nullable: true,
        array: true
    })
    public files: string[];

    @ManyToMany(() => Tag)
    @JoinTable({
        name: "posts_tags",
        joinColumn: {
            name: "post_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "tag_id",
            referencedColumnName: "id"
        }
    })
    public tags?: Tag[]
}