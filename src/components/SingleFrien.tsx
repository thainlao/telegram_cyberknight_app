import React from "react";

export interface Props {
    friend: any;
}

const SingleFrien: React.FC<Props> = ({friend}) => {
    return (
        <div className="single_friend">
            <div className="single_fren_text">
                <h1>{friend}</h1>
            </div>
        </div>
    )
}

export default SingleFrien;