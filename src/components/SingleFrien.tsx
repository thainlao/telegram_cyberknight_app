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

    return (
        <div className="single_friend">
            <div className="single_fren_text">
                <h1>{singleUserData.username}</h1>
                <p>CBK Coins: {singleUserData.cbkCoins}</p>
                <p>Friends: {singleUserData.friends.length}</p>
                <p>Last Collected: {singleUserData.cbkCoins}</p>
            </div>
        </div>
    )
}

export default SingleFrien;