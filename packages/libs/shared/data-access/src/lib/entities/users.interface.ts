/**
 * interface IUser
 *
 * @description
 *
 * provides an entity interface user
 */
export interface IUser {
    id: number;
    chatId: string;
    username: string;
    created: Date;
    updated: Date;
    delivered: boolean;
    dead: boolean;
}