import {
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToOne,
    JoinColumn,
    SimpleConsoleLogger
} from "typeorm";

import bcrypt from 'bcryptjs';
import { Profile } from "./Profile";
import { ROLE } from '../constants';


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

    @Column({ default: ROLE.SUBSCRIBER})
    role!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn()
    profile!: Promise<Profile>;


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

    // Check if User Role is Administrator
    async isAdmin() {
       return  await this.role === ROLE.ADMIN ?  true: false;
    }


    // Check if User Role is Editor
    async isEditor() {
        return  await this.role === ROLE.EDITOR ?  true: false;
    }

    // Check if User Role is Moderator
    async isModerator() {
        return  await this.role === ROLE.MODERATOR ?  true: false;
    }

    // Check if User Role is Subscriber
    async isSubscriber() {
        return  await this.role === ROLE.SUBSCRIBER ?  true: false;
    }

    // Check if User Role is Guest
    async isGuest() {
        return  await this.role === ROLE.GUEST ?  true: false;
    }

}