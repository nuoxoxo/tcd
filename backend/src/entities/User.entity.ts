import { Column, BeforeInsert, Entity, JoinColumn, AfterLoad, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { GameHistory } from "./GameHistory.entity";
import { Friend } from "./Friend.entity";
import { ApiProperty } from '@nestjs/swagger';
import { Chat } from "./Chat.entity";
import { authenticator } from '@otplib/preset-default';


// https://www.tutorialspoint.com/typeorm/typeorm_entity.htm

@Entity()
export class User {
	@ApiProperty({ description: 'The id of the user', example: 1 })
	@PrimaryGeneratedColumn()
	id: number; // unique ID of User

	@ApiProperty({ description: 'The username of the user', example: ' MalcolmX' })
	@Column({ unique: true, nullable: true }) // @Column({unique: true})
	username?: string; // Unique username

	@ApiProperty({ description: 'The avatar of the user', example: 'default.jpeg' })
	@Column({ default: 'default.png' })
	avatar: string; // Link to image || or file path to image

	@ApiProperty({ example: 1 })
	@Column({ default: 0 })
	level: number;

	@ApiProperty({ example: 0 })
	@Column({ default: 0 })
	wins: number;

	@ApiProperty({ example: 0 })
	@Column({ default: 0 })
	loses: number;

	@ApiProperty({ description: 'Wether 2fa is enabled', example: 'false' })
	@Column({ default: false })
	twofa: boolean;

	@ApiProperty({ description: '2fa secret key' })
	@Column({ unique: true, nullable: false })
	twofa_secret: string;

	@ApiProperty({
		description: 'list of games that the user has won', type: () => GameHistory
	})
	@OneToMany( // 1:many : a user can have mult. game histories log where they are winner
		() => GameHistory,
		// target entity type
		// specifies the type of the related entity: GameHistory
		(gameHistory) => gameHistory.winner
	)
	games_won: GameHistory[];

	@ApiProperty({
		description: 'list of games that the user has lost', type: () => GameHistory
	})
	@OneToMany(
		() => GameHistory, (gameHistory) => gameHistory.loser
	)
	games_lost: GameHistory[];

	@ApiProperty({ description: 'list of friend requests the user has sent', type: () => Friend })
	@OneToMany(() => Friend, (friend) => friend.sender) // Applicant
	sentFriendRequests: Friend[];

	@ApiProperty({ description: 'list of friend requests the user has recieved', type: () => Friend })
	@OneToMany(() => Friend, (friend) => friend.reciever) // Recipient
	receivedFriendRequests: Friend[];

	@ApiProperty({ description: 'list of chats connected to the user', type: () => Chat })
	@ManyToMany(() => Chat, (chat) => chat.users)
	chats: Chat[];

	@ApiProperty({ description: 'the id of the oath parent', example: 216532132 })
	@Column({ default: '', unique: true })
	oauthID: string;

	@ApiProperty({ description: 'Creation Date epoch', example: '1669318644507' })
	@Column()
	createdAt: string;

	@BeforeInsert()
	updateDates() {
		const date = new Date().valueOf() + 3600;
		this.createdAt = date.toString();
	}

	@BeforeInsert()
	createSecret() {
		this.twofa_secret = authenticator.generateSecret();
	}
}
