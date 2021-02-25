import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity({'name': 'users'})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ length: 64, unique: true })
    user_id!: string;
    
    @Column({ length: 100})
    firstName!: string;

    @Column({ length: 100})
    lastName!: string;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ length: 200})
    password!: string;

}