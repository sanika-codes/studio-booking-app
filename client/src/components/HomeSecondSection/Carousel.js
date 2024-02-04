import { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import studioPhoto1 from './assets/images/studio-photo.png';
import studioPhoto2 from './assets/images/IMG_1698.jpg';
import studioPhoto3 from './assets/images/IMG_1690.jpg';
import studioPhoto4 from './assets/images/IMG_1674.jpg';
import classes from './Carousel.css';


const images = [{
  id: 1,
  src: studioPhoto1,
  alt: "Image 1"
},
{
  id: 2,
  src: studioPhoto2,
  alt: "Image 2 "
},
{
  id: 3,
  src: studioPhoto3,
  alt: "Image 3"
},
{
  id: 4,
  src: studioPhoto4,
  alt: "Image 3"
}
];

function Carousel() {
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,

};

  return (
    <>
   
    <div className={`container imgslider`} >
        <Slider {...settings}>
            {images.map((item) => (
                <div key={item.id}>
                    <img src={item.src} alt={item.alt} />
                </div>
            ))}
        </Slider>
    </div>
</>
  );
}

export default Carousel;