import React from "react";
import { IFriend } from "../utils/types";

export interface Props {
    friend: IFriend
}

const SingleFrien: React.FC<Props> = ({friend}) => {
    return (
        <div className="single_friend">
            <div className="single_fren_text">
                <h1>{friend.friendName}</h1>
            </div>
        </div>
    )
}

export default SingleFrien;