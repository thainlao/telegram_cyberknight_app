import React from "react";
import { IFriend } from "../utils/types";

export interface Props {
    friend: IFriend
}

const SingleFrien: React.FC<Props> = ({friend}) => {
    const initial = friend.friendName.charAt(0).toUpperCase();

    return (
        <div className="single_friend">
            <div className="single_friend_element1">
                {friend.friendavatar ? (
                        <img src={friend.friendavatar} alt={friend.friendName} />
                    ) : (
                        <div className="avatar-placeholder">
                            {initial}
                        </div>
                    )
                }

                <div className="single_fren_text">
                    <h1>{friend.friendName}</h1>
                    <div>
                        <h3> + {friend.friendFriends}</h3>
                    </div>
                </div>
            </div>

            <h2>{friend.firendCBK} CBK</h2>
        </div>
    )
}

export default SingleFrien;