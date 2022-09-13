import {
	AfterInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import { Users } from "@entities/users.entity";
import slug from "slug";
import { Categories } from "@entities/categories.entity";

@Entity()
export class Products {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(() => Categories)
	@JoinColumn({
		name: "category_id",
		referencedColumnName: "id",
		foreignKeyConstraintName: "fk_product_category"
	})
	category: string;

	@Column({
		length: 35
	})
	code: string;

	@Column({
		type: "varchar",
		length: 200
	})
	name: string;

	@Column({
		type: "varchar"
	})
	slug: string;

	@Column({
		type: "decimal"
	})
	views: number;

	@ManyToOne(() => Users)
	@JoinColumn({
		name: "create_by",
		referencedColumnName: "id",
		foreignKeyConstraintName: "fk_product_user"
	})
	user: string;

	@Column({
		type: "enum",
		enum: ["PUBLISH", "DRAFT"],
		default: "PUBLISH"
	})
	status: string;

	@CreateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)"
	})
	create_at: Date;

	@CreateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)"
	})
	update_at: Date;

	@DeleteDateColumn()
	delete_at: Date;

	@AfterInsert()
	assignSlug() {
		this.slug = slug(this.name);
	}
}
