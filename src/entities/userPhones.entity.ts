import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserContacts } from "./userContacts.entity";
import { Users } from "./users.entity";

@Entity("user_phones")
class UserPhones {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, length: 60 })
    phone: string;

    @ManyToOne(() => Users)
    user: Users;

    @ManyToOne(() => UserContacts)
    contact: UserContacts;
}

export { UserPhones };
