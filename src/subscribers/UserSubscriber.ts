import { 
    EntitySubscriberInterface, 
    EventSubscriber, 
    InsertEvent 
} from "typeorm";

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
    async afterInsert(event: InsertEvent<User>) {
        console.log(`AFTER USER INSERTED: `, event.entity);
    }

}