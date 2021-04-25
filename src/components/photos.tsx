import React, { useEffect, useState } from 'react';

import '../App.scss';
import { Link } from 'react-router-dom';

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function DisplayPictures() {
  const perPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [photoData, setPhotoData] = useState<any>([]);

  const sol = 1000;
  const cam = 'FHAZ';
  const rover = 'Curiosity';

  useEffect(() => {
    const nasaResponse = () => {
      fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${cam}&rover=${rover}&per_page=${perPage}&page=${page}&api_key=${apiKey}`
      )
        .then((res) => res.json())
        .then((res) => {
          setTotalPages(1000);
          setPhotoData([...photoData, ...res.photos]);
          console.log(res);
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
        <div className="container">
          <div className="location">
            {photoData.map((x, y) => (
              <div className="photos" key={y}>
                <img className="mars-image" src={x.img_src} alt="random" />
              </div>
            ))}
          </div>
          {totalPages !== page && (
            <button className="load-button" onClick={() => setPage(page + 1)}>
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
}
