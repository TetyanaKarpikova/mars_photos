import React from 'react';
import './OnePhoto.css';

const OnePhotos = ({ item, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (      
            <div className='column'>
                <img src={item.img_src} />
            </div>       
    )
};

export default OnePhotos;
