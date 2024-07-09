export interface ITasks {
    _id: string;
    img: string;
    title: string;
    task_text: string;
    status: Status;
}

export type Status = 'done' | 'claim' | 'blocked';

export interface Iprops {
    singleTask: ITasks;
}

export interface IFriend {
    _id: string;
    friendavatar: string;
    friendName: string;
    friendFriends: number;
    firendCBK: number;
}

export interface IUserData {
    _id: string;
    telegramId: string;
    username: string;
    cbkCoins: number;
    friends: any[];
}

export interface UserDataProps {
    userData: IUserData;
}