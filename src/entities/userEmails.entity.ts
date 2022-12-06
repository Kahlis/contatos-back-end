import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserContacts } from "./userContacts.entity";
import { Users } from "./users.entity";

@Entity("user_emails")
class UserEmails {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, length: 60 })
    email: string;

    @ManyToOne(() => Users)
    user: Users;

    @ManyToOne(() => UserContacts)
    contact: UserContacts;
}

export { UserEmails };
