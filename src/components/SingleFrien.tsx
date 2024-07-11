import React, { useEffect, useState } from "react";
import { fetchUserData } from "../hoocs/fetchUserData";
import { IUserData } from "../utils/types";

export interface Props {
    friend: any;
}

const SingleFrien: React.FC<Props> = ({friend}) => {
    const [singleUserData, setSingleUserData] = useState<IUserData | null>(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData(friend);
                setSingleUserData(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        getUserData();
    }, [friend]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!singleUserData) {
        return <p>Loading...</p>;
    }

    let firstCharecters = friend.username.split(' ').map((a: string) => a[0]);

    return (
        <div className="single_friend">
                <div className="single_friend_text">
                <div className="avatar-placeholder">
                    <h1>{firstCharecters}</h1>
                </div>
                    <section>
                        <h1>{friend.username}</h1>
                        <p>+ {friend.friends.length}</p>
                    </section>
                </div>
                <h3>{friend.cbkCoins} <span>CBK</span></h3>
        </div>
    )
}

export default SingleFrien;