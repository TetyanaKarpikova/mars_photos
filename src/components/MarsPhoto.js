import React from 'react';
import { useState, useEffect } from 'react';
import OnePhotos from './OnePhotos';
import './MarsPhoto.css';


const MarsPhoto = ({ rover, camera, sol }) => {
    const [photoData, setPhotoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(9);

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${process.env.REACT_APP_NASA}`

      const showMore = () => {
        setVisible((prevValue) => prevValue + visible);
    }

    const handleTime = setTimeout(() => {
        'Please, waite.'
    }, 3000);

    const fetchPhoto = async () => {
        setLoading(true);
        const templPhotos = [];

        const res = await fetch(url)
            .then(value => value.json())

        for (const element of res.photos) {
            if (element.camera.name === camera) {
                templPhotos.push(element);
            }
        }

        setPhotoData(photoData => templPhotos);
        setLoading(false);        
    }


    useEffect(() => {
        fetchPhoto();      

    }, [rover, camera, sol]);


    return (
        <div>
            <div className="row">
                {!!photoData &&
                    photoData.slice(0, visible).map((value, index) => {
                        return (<OnePhotos item={value} loading={loading} key={index} />)

                    })
                }
            </div>
            {!!photoData &&
                photoData.length > visible &&
                < button className='btn-loard' onClick={showMore}>Loard more</button>
            }


            {photoData.length === 0 &&
                <h3>Sorry, can't find any information.
                    Please select another rover or camera.</h3>
            }

            

        </div >

    )
};

export default MarsPhoto;
