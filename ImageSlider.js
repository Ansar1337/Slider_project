"use strict";

class ImageSlider {
    element;
    slidesImages;
    slidesWrapper;
    slides;
    imagesContainer = [];
    imagesCount;
    slideByCount;
    slideDirection = null;

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

        arrowRight.addEventListener("click", (e) => {
            this.goForward();
        });

        this.slides = document.createElement("div");
        this.slides.classList.add("slides");

        this.slidesWrapper = document.createElement("div");
        this.slidesWrapper.classList.add("slides-wrapper");

        this.slidesWrapper.addEventListener("transitionend", (e) => {
            if (e.propertyName === "transform") {

                if (this.slideDirection === "forward") {
                    this.slidesWrapper.lastElementChild.after(this.slidesWrapper.firstElementChild);
                } else if (this.slideDirection === "backward") {
                    this.slidesWrapper.firstElementChild.before(this.slidesWrapper.lastElementChild);
                }

                this.slidesWrapper.style.transition = "none";
                this.slidesWrapper.style.transform = "translate(0px,0px)";
                this.slideDirection = null;
            }
        });

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

            // deprecated array usage
            // this.imagesContainer.push(this.slidesImages);

            this.slidesWrapper.append(this.slidesImages);
        }
        this.transformImages();
        this.resizeContainer();
    }


    transformImages() {
        const imagesDistance = this.getImagesDistance().distanceX;
        for (let i = 0; i < this.slidesWrapper.children.length; i++) {
            this.slidesWrapper.children[i].style.transform = `translate(${-imagesDistance}px`;
        }
        console.log(this.slidesWrapper.firstElementChild);
        console.log(this.slidesWrapper.lastElementChild);
    }

    getImagesDistance() {
        let distanceX = 0;
        if (this.slidesWrapper.children.length > 1) {
            distanceX = this.slidesWrapper.children[1].getBoundingClientRect().x - this.slidesWrapper.children[0].getBoundingClientRect().x;
        } else {
            distanceX = this.slidesWrapper.children[0].getBoundingClientRect().x;
        }
        let gapDistance = this.slidesWrapper.children[1].getBoundingClientRect().left - this.slidesWrapper.children[0].getBoundingClientRect().right;
        let imageWidth = this.slidesWrapper.children[0].getBoundingClientRect().width;
        console.log(distanceX, gapDistance, imageWidth);
        return {distanceX, gapDistance, imageWidth};
    }

    resizeContainer() {
        const distance = this.getImagesDistance();
        this.slides.style.width = (distance.imageWidth * this.imagesCount) + (distance.gapDistance * (this.imagesCount - 1)) + "px";
    }


    goForward() {
        this.slideDirection = "forward";
        this.slidesWrapper.style.transition = "transform 0.3s ease";
        this.slidesWrapper.style.transform = `translateX(-${this.getImagesDistance().distanceX}px)`;
    }

    goBack() {
        this.slideDirection = "backward";
        this.slidesWrapper.style.transition = "transform 0.3s ease";
        this.slidesWrapper.style.transform = `translateX(${this.getImagesDistance().distanceX}px)`;
    }
}

// контейнер в котором лежат картинки должен иметь размер = distanceX * imagesCount