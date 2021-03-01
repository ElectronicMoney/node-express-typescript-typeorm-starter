import { 
    EntitySubscriberInterface, 
    EventSubscriber, 
    InsertEvent 
} from "typeorm";
import { Profile } from "../models/Profile";
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
        // Create Profile for the user
        const profile = new Profile()

        const profilePayload = {
            profileId: uuidv4(),
            name: `${event.entity.firstName} ${event.entity.lastName}`,
            user: event.entity
        }
        profile.createProfile(profilePayload)
    }

}