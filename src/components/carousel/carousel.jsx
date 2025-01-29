import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  '/assets/images/obi-pixel9propics-aZKJEvydrNM-unsplash.jpg',
  'https://via.placeholder.com/600x300/00FF00/FFFFFF?text=Image+2',
  'https://via.placeholder.com/600x300/0000FF/FFFFFF?text=Image+3',
  'https://via.placeholder.com/600x300/FFFF00/FFFFFF?text=Image+4',
];

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
