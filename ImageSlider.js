"use strict";

class ImageSlider {
    element;
    slidesImages;
    slidesWrapper;
    slides;
    imagesContainer = [];
    imagesCount;
    slideByCount;

    constructor(element = document.body, imagesCount = 3, mainImageId = 1, slideByCount = 1) {
        this.element = element;
        this.createSlider();
        this.imagesCount = imagesCount;
        this.slideByCount = slideByCount;
    }

    createSlider() {
        const slider = document.createElement("div");
        slider.classList.add("slider");

        const sliderWrapper = document.createElement("div");
        sliderWrapper.classList.add("slider-wrapper");

        const arrowLeft = document.createElement("button");
        arrowLeft.classList.add("arrow", "arrow-left");

        arrowLeft.addEventListener("click", () => {
            this.goBack();
        });

        const arrowRight = document.createElement("button");
        arrowRight.classList.add("arrow", "arrow-right");

        arrowRight.addEventListener("click", () => {
            this.goForward();
        });

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
        for (let i = 0; i < imageArray.length + (this.slideByCount * 2); i++) {
            this.slidesImages = document.createElement("div");
            this.slidesImages.classList.add("slides-images");

            const images = document.createElement("img");
            images.src = imageArray[i % imageArray.length];

            this.slidesImages.append(images);
            this.imagesContainer.push(this.slidesImages);
            // this.slidesImages.style.transform = "translateX(-115px)";
            // this.slidesImages.style.transform = `translateX(${-this.getImagesDistance()}px)`;

            this.slidesWrapper.append(this.slidesImages);
        }
        this.transformImages();
        this.resizeContainer();
    }


    transformImages() {
        const imagesDistance = this.getImagesDistance();
        for (let i = 0; i < this.imagesContainer.length; i++) {
            // this.slidesWrapper.firstElementChild.before(this.slidesWrapper.lastElementChild);
            this.imagesContainer[i].style.transform = `translate(${-imagesDistance}px`;
            // this.slidesImages.style.transform = `translateX(${-imagesDistance}px)`;
        }
        console.log(this.slidesWrapper.firstElementChild);
        console.log(this.slidesWrapper.lastElementChild);
    }

    // 1-ый цикл генерирует контейнер с изоброжениями
    // 2-ой цикл генерирует 2 контейнера с изоброжениями ссылаясь на исходный размер род контейнера (imageArray.length + + (slideByCount * 2))

    getImagesDistance() {
        let distanceX = 0;
        if (this.imagesContainer.length > 1) {
            distanceX = this.imagesContainer[1].getBoundingClientRect().x - this.imagesContainer[0].getBoundingClientRect().x;
        } else {
            distanceX = this.imagesContainer[0].getBoundingClientRect().x;
        }
        return distanceX;
    }

    resizeContainer() {
        this.slides.style.width = this.getImagesDistance() * this.imagesCount + "px";
    }


    goForward() {
        this.slidesWrapper.style.transform = `translateX(${this.getImagesDistance()}px)`;
        // this.imagesContainer[0].before(this.imagesContainer[this.imagesContainer.length - 1]);
        // console.log(this.imagesContainer);
    }

    goBack() {
        this.slidesWrapper.style.transform = `translateX(${-this.getImagesDistance()}px)`;

    }
}

// контейнер в котором лежат картинки должен иметь размер = distanceX * imagesCount