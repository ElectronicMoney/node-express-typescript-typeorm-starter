import { 
    EntitySubscriberInterface, 
    EventSubscriber, 
    InsertEvent 
} from "typeorm";
import { Role } from "../models/Role";
import { v4 as uuidv4 } from 'uuid';

import { User } from "../models/User";


@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {


    /**
     * Indicates that this subscriber only listen to User events.
     */
    listenTo() {
        return User;
    }

    /**
     * Called after user insertion.
     */
    afterInsert(event: InsertEvent<User>) {
        // Create Role for the user
        const role = new Role()

        const rolePayload = {
            roleId: uuidv4(),
            user: event.entity
        }
        role.createRole(rolePayload)
    }

}