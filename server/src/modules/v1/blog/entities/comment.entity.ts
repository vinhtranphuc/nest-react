import { AbstractEntity, User } from "common/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Comment extends AbstractEntity<Comment> {

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn({name:'creator_id'})
    public creator: User;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn({name:'updater_id'})
    public updater: User;

    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: "post_id" })
    public post: Post;

    @Column({
        name: 'comment_parent_id',
        nullable: true
    })
    public commentParentId: string;

    @Column({
        name: 'content',
        nullable: false
    })
    public content: string;
}