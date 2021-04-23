import React, { useEffect, useState } from 'react';
import MarsPhoto from './MarsPhoto';
import '../components/Home.css';


export default function Home() {
    const [rover, setRover] = useState('');
    const [camera, setCamera] = useState('');
    const [nextPage, setNextPage] = useState(false);
    const [sol, setSol] = useState(0);
    const [maxSol, setMaxSol] = useState(0);    

    const handleCuriosity = () => {
        setRover(rover => "curiosity");
    };

    const handleOpportunity = () => {
        setRover(rover => "opportunity");
    };

    const handleSpirit = () => {
        setRover(rover => "spirit");
    };

    const handleFhaz = () => {
        setCamera(camera => "FHAZ");
        setNextPage(nextPage => true);
    }

    const handleRHAZ = () => {
        setCamera(camera => "RHAZ");
        setNextPage(nextPage => true);
    }

    const handleMHAZ = () => {
        setCamera(camera => "MAST");
        setNextPage(nextPage => true);
    }

    const handleChemcam = () => {
        setCamera(camera => "CHEMCAM");
        setNextPage(nextPage => true);
    }

    const handleMahli = () => {
        setCamera(camera => "MAHLI");
        setNextPage(nextPage => true);
    }

    const handleMardi = () => {
        setCamera(camera => "MARDI");
        setNextPage(nextPage => true);
    }

    const handleNavcam = () => {
        setCamera(camera => "NAVCAM");
        setNextPage(nextPage => true);
    }

    const handlePancam = () => {
        setCamera(camera => "PANCAM");
        setNextPage(nextPage => true);
    }

    const handleInput = (event) => {
        setSol(sol => event.target.value);
    }
    
    const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.REACT_APP_NASA}`;
    
    const fechData = async () => {
        const response = await fetch(url);
        const json = await response.json();
       
        const { max_sol } = json.photo_manifest
        setMaxSol(maxSol => max_sol);
    }
  
    useEffect(() => {
        fechData();        
    }, [rover]);


    return (
        <div >
            <div className='back-img'>               
                <h1>NASA`s expeditions to Mars</h1>
                <div className='root'>

                    <div className='fl-rover'>
                        <h2>Rover  --  {rover}</h2>
                        <button className='btn-rover' onClick={handleCuriosity}>Curiosity</button>
                        <button className='btn-rover' onClick={handleOpportunity}>Opportunity</button>
                        <button className='btn-rover' onClick={handleSpirit}>Spirit</button>
                    </div>


                    {!!rover &&
                        <div className='baseSlider'>
                            <h2> Sol (Mars day) </h2>
                            <div className='range'>

                                <div className='field'>
                                    <div className='value left'>0</div>
                                    <input type='number'
                                        min='0'
                                        max={maxSol}
                                        onInput={handleInput}></input>
                                    <div className='value right'>{maxSol}</div>

                                </div>
                            </div>

                        </div>
                    }

                    {!!sol &&
                        <div className='base-cam'>
                            <h2>Camera   --  {camera}</h2>
                            <div className="flex-cam">
                                <div className="bord-1" onClick={handleFhaz}>Front Hazard Avoidance</div>
                                <div className="bord-1" onClick={handleRHAZ}>Rear Hazard Avoidance</div>
                                <div className="bord-1" onClick={handleMHAZ}>Mast </div>
                                <div className="bord-1" onClick={handleChemcam}>Chemistry and Camera Complex </div>
                                <div className="bord-1" onClick={handleMahli}>	Mars Hand Lens Imager</div>
                                <div className="bord-1" onClick={handleMardi}>	Mars Descent Imager</div>
                                <div className="bord-1" onClick={handleNavcam}>Navigation</div>
                                <div className="bord-1" onClick={handlePancam}>Panoramic</div>
                            </div>

                        </div>}
                </div>
            </div>

            {!!nextPage &&
                <MarsPhoto rover={rover}
                    camera={camera}
                    sol={sol}
                />}
        </div>
    )
}