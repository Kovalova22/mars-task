/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import '../App.scss';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function DisplayPictures() {
  const perPage = 1;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [photoData, setPhotoData] = useState<any>([]);

  const [state, setState] = useState<any>({
    sol: '1000',
    cam: 'FHAZ',
    rover: 'Curiosity',
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  useEffect(() => {
    const sol = state.sol;
    const cam = state.cam;
    const rover = state.rover;

    const link = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${cam}&rover=${rover}&per_page=${perPage}&page=${page}&api_key=${apiKey}`;

    const nasaResponse = () => {
      fetch(link)
        .then((res) => res.json())
        .then((res) => {
          setTotalPages(1000);
          setPhotoData([...photoData, ...res.photos]);
          console.log(res.photos);
          if (!res.photos.length) {
            alert('No more pictures with such characteristics!');
            window.location.reload();
          }
        });
    };
    nasaResponse();
  }, [page]);

  return (
    <>
      <div className="content">
        <Link className="go-back-link" to="/">
          Go back
        </Link>
        <h3>Please choose a Sol, Camera and Rover</h3>
        <div className="options">
          <Input
            className="select-input"
            type="select"
            name="sol"
            value={state.sol}
            onChange={handleChange}
          >
            <option value="1000">1000</option>
            <option value="900">900</option>
          </Input>
          <Input
            className="select-input"
            type="select"
            name="cam"
            value={state.cam}
            onChange={handleChange}
          >
            <option value="FHAZ">FHAZ</option>
            <option value="RHAZ">RHAZ</option>
            <option value="MAST">MAST</option>
            <option value="CHEMCAM">CHEMCAM</option>
            <option value="MAHLI">MAHLI</option>
            <option value="MARDI">MARDI</option>
            <option value="NAVCAM">NAVCAM</option>
            <option value="PANCAM">PANCAM</option>
            <option value="MINITES">MINITES</option>
          </Input>
          <Input
            className="select-input"
            type="select"
            name="rover"
            value={state.rover}
            onChange={handleChange}
          >
            <option value="Curiosity">Curiosity</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Spirit">Spirit</option>
          </Input>
        </div>
        <div className="container">
          <div className="location">
            {photoData.map((x, y) => (
              <div className="photos" key={y}>
                <img className="mars-image" src={x.img_src} alt="random" />
              </div>
            ))}
          </div>
          {totalPages !== page && (
            <button
              className="load-button"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
}
