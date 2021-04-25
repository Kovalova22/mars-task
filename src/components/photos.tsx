import React, { useEffect, useState } from 'react';
import { slice, concat } from 'lodash';

import { api } from '../api/api';

import '../App.scss';

export default function DisplayPictures() {
  const [photoData, setPhotoData] = useState<any>([]);

  useEffect(() => {
    const nasaResponse = async () => {
      const res = await api.nasaPhotos.get();
      const photos = res.data.photos;
      setPhotoData([...photoData, ...photos]);
      console.log(photoData);
    };
    nasaResponse();
  }, [photoData]);

  const LENGTH = photoData.length;
  const DATA = [...photoData];
  const LIMIT = 5;

  const [showMore, setShowMore] = useState(true);
  const [list, setList] = useState(slice(DATA, 0, LIMIT));
  const [index, setIndex] = useState(LIMIT);

  const loadMore = () => {
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < LENGTH - 1;
    const newList = concat(list, slice(DATA, index, newIndex));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
  };

  return (
    <>
      <div className="location">
        {list.map((x, y) => (
          <div className="photos" key={y}>
            <img className="mars-image" src={x.img_src} alt="random" />
          </div>
        ))}
        {showMore && (
          <button className="load-button" onClick={loadMore}>
            {' '}
            Load More{' '}
          </button>
        )}
      </div>
    </>
  );
}
