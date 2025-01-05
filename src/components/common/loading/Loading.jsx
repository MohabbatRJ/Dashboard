// components/common/Loading.jsx

import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loading = ({ loading }) => {
    return (
        loading && (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                    zIndex: 9999, // Ensure it's on top of other components
                }}
            >
                <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
        )
    );
};

export default Loading;
