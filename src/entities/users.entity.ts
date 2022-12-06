import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { UserContacts } from "./userContacts.entity";
import { UserEmails } from "./userEmails.entity";
import { UserPhones } from "./userPhones.entity";

@Entity("users")
class Users {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 60 })
    name: string;

    @Column({ unique: true, length: 60 })
    email: string;

    @Column()
    isActive: boolean;

    @OneToMany(() => UserEmails, (userEmail) => userEmail.email)
    emails: UserEmails[];

    @OneToMany(() => UserPhones, (userPhone) => userPhone.phone)
    phones: UserPhones[];

    @OneToMany(() => UserContacts, (userContact) => userContact.name)
    contacts: UserContacts[];

    @Column({ length: 120 })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export { Users };
