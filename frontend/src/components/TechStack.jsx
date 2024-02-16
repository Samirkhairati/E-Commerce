import React from 'react';

const TechStack = (props) => {
    return (
        <>
            <props.icon className={`text-${String(props.color)}-400 mx-2`} />
        </>
    );
};

export default TechStack;