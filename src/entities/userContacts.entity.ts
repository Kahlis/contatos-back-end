import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Users } from "./users.entity";
import { UserEmails } from "./userEmails.entity";
import { UserPhones } from "./userPhones.entity";

@Entity("user_contacts")
class UserContacts {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 64 })
    name: string;

    @OneToMany(() => UserEmails, (userEmail) => userEmail.email)
    emails: UserEmails[];

    @OneToMany(() => UserPhones, (userPhone) => userPhone.phone)
    phones: UserPhones[];

    @ManyToOne(() => Users)
    user: Users;
}

export { UserContacts };
