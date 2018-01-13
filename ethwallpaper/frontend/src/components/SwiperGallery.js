import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/css/swiper.css';
import './SwiperGallery.css';


export class SwiperGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      gallerySwiper: null,
      thumbnailSwiper: null
    };

    this.galleryRef = this.galleryRef.bind(this);
    this.thumbRef = this.thumbRef.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.gallerySwiper && nextState.thumbnailSwiper) {
      const { gallerySwiper, thumbnailSwiper } = nextState;

      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }

  galleryRef(ref) {
    if (ref) this.setState({ gallerySwiper: ref.swiper })
  }

  thumbRef(ref) {
    if (ref) this.setState({ thumbnailSwiper: ref.swiper })
  }

  render() {
    const gallerySwiperParams = {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    };

    const thumbnailSwiperParams = {
      paceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true
    };

    return (
        <div className="swiper-gallery">
          <Swiper {...gallerySwiperParams} ref={this.galleryRef}>
            { this.state.images.map(i => <div key={i.name}><img src={i.preview} alt="preview" /></div>) }
          </Swiper>
          <Swiper {...thumbnailSwiperParams} ref={this.thumbRef}>
            { this.state.images.map(i => <div key={i.name}><img src={i.preview} alt="preview" /></div>) }
          </Swiper>
        </div>
    );
  }
}