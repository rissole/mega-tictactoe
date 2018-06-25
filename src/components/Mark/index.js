import React from 'react';

export default ({ symbol }) => {
    if (symbol === 'o') {
        return <span role="img" aria-label="circle">⭕️</span>;
    } else if (symbol === 'x') {
        return <span role="img" aria-label="cross">❌</span>;
    }
    return null;
}