import {
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne
} from "typeorm";

import {User} from './User';


@Entity({'name': 'roles'})
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ length: 64, unique: true })
    roleId!: string;
    
    @Column({ length: 100, default: "Basic"})
    name!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(
        () => User, user => user.roles,
        {onUpdate: 'CASCADE', onDelete: "CASCADE"}
    )
    user!: User;


    // Create Role
    async createRole(rolePaylaod: any): Promise<Role> {
        // Create the instance of a Role
        const role = new Role()

        // role.userId   = rolePaylaod.userId;
        role.roleId   = rolePaylaod.roleId;
        role.name     = rolePaylaod.name;
        role.user     = rolePaylaod.user;

        const newRole = await role.save();

        return newRole; 
    }

    // Get All Roles
    async getRoles(): Promise<Role[]> {
        const roles = await Role.find();
        return roles; 
    }
    

}