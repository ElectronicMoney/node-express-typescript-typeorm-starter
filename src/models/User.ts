import {
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany
} from "typeorm";

import bcrypt from 'bcryptjs';
import { Role } from "./Role";


@Entity({'name': 'users'})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({ length: 64, unique: true })
    userId!: string;
    
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

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Role, role => role.user)
    roles!: Role[];


    // Create User
    async createUser(userPaylaod: any): Promise<User> {
        // Create the instance of a User
        const user = new User()

        user.userId   = userPaylaod.userId;
        user.firstName = userPaylaod.firstName;
        user.lastName  = userPaylaod.lastName;
        user.email     = userPaylaod.email;
        user.username  = userPaylaod.username;
        user.password  = await bcrypt.hash(userPaylaod.password, 10);

        const newUser = await user.save();

        return newUser; 
    }

    // Get All Users
    async getUsers(): Promise<User[]> {
        const users = await User.find();
        return users; 
    }

    // get A User
    async getUser(userId: string): Promise<User> {

        const user = await User.findOne({where: {userId: userId} });

        return user!; 
    }


    // Update A User
    async updateUser(userId: string, userPayload: any): Promise<User> {

        const user = await User.findOne({where: {userId: userId} });

        user!.firstName = userPayload.firstName
        user!.lastName  = userPayload.lastName

        const updatedUser = await user!.save();
        return updatedUser; 
    }


    // Delete A User
    async deleteUser (userId: string): Promise<User> {

        const user = await User.findOne({where: {userId: userId} });

        const deletedUser = await user!.remove();
        return deletedUser

    }

    // Get User By Email
    async getUserById(userId: string) {
        const user = await User.findOne({where: {userId: userId} });
        return user
    }

    // Get User By Email
    async getUserByEmail(email: string) {
        const user = await User.findOne({where: {email: email} });
        return user
    }

     // Check if username exists
     async usernameExist(username: string) {
        const user = await User.findOne({where: {username: username} });
        return user ? true : false
    }

    // Check if email exists
    async emailExist(email: string) {
        const user = await User.findOne({where: {email: email} });
        return user ? true : false
    }

}