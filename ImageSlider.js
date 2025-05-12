"use strict";

class ImageSlider {
    element;
    slidesImages;
    slidesWrapper;
    slides;
    imagesContainer = [];

    constructor(element, imagesCount, mainImageId, slideByCount) {
        this.element = element;
        this.createSlider();
        // imagesCount = this.slides.style.width = this.distanceImages() * imagesCount;
        this.slides.style.width = this.distanceImages() * imagesCount + "px";
    }

    createSlider() {
        const slider = document.createElement("div");
        slider.classList.add("slider");

        const sliderWrapper = document.createElement("div");
        sliderWrapper.classList.add("slider-wrapper");

        const arrowLeft = document.createElement("button");
        arrowLeft.classList.add("arrow", "arrow-left");

        const arrowRight = document.createElement("button");
        arrowRight.classList.add("arrow", "arrow-right");

        this.slides = document.createElement("div");
        this.slides.classList.add("slides");

        this.slidesWrapper = document.createElement("div");
        this.slidesWrapper.classList.add("slides-wrapper");

        this.element.append(slider);
        slider.append(sliderWrapper);

        sliderWrapper.append(arrowLeft);
        sliderWrapper.append(this.slides);
        sliderWrapper.append(arrowRight);
        this.slides.append(this.slidesWrapper);

        return slider;
    }

    loadImages(imageArray = []) {
        for (let i = 0; i < imageArray.length; i++) {
            this.slidesImages = document.createElement("div");
            this.slidesImages.classList.add("slides-images");
            this.slidesWrapper.append(this.slidesImages);

            const images = document.createElement("img");
            images.src = imageArray[i];

            this.slidesImages.append(images);
            this.imagesContainer.push(images);
            // console.log(this.imagesContainer);
        }
    }


    distanceImages() {
        const distanceX = this.imagesContainer[1].getBoundingClientRect().x - this.imagesContainer[0].getBoundingClientRect().x;

        // const slides = document.getElementsByClassName("slides")[0].style.width = distanceX + "px";
        // console.log(distanceX);
        return distanceX;
    }

    goForward() {

    }

    goBack() {

    }
}

// контейнер в котором лежат картинки должен иметь размер = distanceX * imagesCount