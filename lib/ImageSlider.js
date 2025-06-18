"use strict";

// mainImageId = Возможность указать номер "основного" изображения среди отображаемых (отсчет с нуля, по умолчанию: 1 — центральное, если указано -1, то главных нет).
// 1. проверка на валидность значения mainImageId +++
// 1.1 Задаю main image class картинке посередине  this.slidesWrapper.children[this.mainImageId + this.slideByCount].classList.add("main-image");
// 1.2 Убираю стиль с картинки (this.slidesWrapper.children)

// Проходим по элементам массива и убираем класс "main-image"
// this.slidesWrapper.children.forEach(child => {
//     child.classList.remove("main-image");
// });


// 1.3 Смещение галерии влево или вправо
// 1.4 Повторно накладываю стиль main image


// *. динамическое отслеживание индекса "картинки" после goForward() И goBack();

// slideByCount = Возможность указать количество изображений, перелистываемых при нажатии на кнопки (по умолчанию: 1);


// 1. срабатывает goForward();
// 2. выполняются стили goForward();
// 3. срабатывает второй листенер на transitionend, видоизменяется коллекция
// 4. выделяется main image;

class ImageSlider {
    element;
    slidesWrapper;
    slides;
    imagesCount;
    slideByCount;
    mainImageId;
    slideDirection = null;
    createSliderChecker = false;
    static cssPromise = new Promise((resolve) => {
        const cssFile = document.createElement("link");
        cssFile.rel = "stylesheet";
        cssFile.type = "text/css";
        cssFile.href = "styles.css";

        cssFile.onload = () => resolve();

        document.head.append(cssFile);
    });

    constructor(element = document.body, imagesCount = 3, mainImageId = 1, slideByCount = 1) {
        this.element = element;
        this.imagesCount = imagesCount;
        this.mainImageId = mainImageId;
        this.slideByCount = slideByCount;

        ImageSlider.cssPromise.then(() => {
            this.createSlider();
        })
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
                    for (let i = 0; i < this.slideByCount; i++) {
                        this.slidesWrapper.lastElementChild.after(this.slidesWrapper.firstElementChild);
                    }
                    this.markMainImage();
                } else if (this.slideDirection === "backward") {
                    for (let i = 0; i < this.slideByCount; i++) {
                        this.slidesWrapper.firstElementChild.before(this.slidesWrapper.lastElementChild);
                    }
                    this.markMainImage();
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

        this.createSliderChecker = true;

        return slider;
    }

    loadImages(imageArray = []) {
        const that = this;
        ImageSlider.cssPromise.then(() => {
            for (let i = 0; i < imageArray.length + (this.slideByCount * 2); i++) {
                const slideImage = document.createElement("div");
                slideImage.classList.add("slides-images");

                const image = document.createElement("img");
                image.src = imageArray[i % imageArray.length];

                slideImage.append(image);
                this.slidesWrapper.append(slideImage);
            }
            that.markMainImage();
            that.transformImages();
            that.resizeContainer();
        });
    }


    markMainImage() {
        for (let i = 0; i < this.slidesWrapper.children.length; i++) {
            this.slidesWrapper.children[i].classList.remove("main-image");
        }
        if (this.mainImageId >= 0) {
            this.slidesWrapper.children[this.mainImageId + this.slideByCount].classList.add("main-image");
        }
        console.log(this.slidesWrapper.children.length);
    }


    transformImages() {
        const imagesDistance = this.getImagesDistance().distanceX;
        for (let i = 0; i < this.slidesWrapper.children.length; i++) {
            this.slidesWrapper.children[i].style.transform = `translate(${-imagesDistance * this.slideByCount}px`;
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

        if (this.slideByCount > 1) {
            this.slidesWrapper.style.transition = "transform 0.3s ease";
            this.slidesWrapper.style.transform = `translateX(-${this.getImagesDistance().distanceX * this.slideByCount}px)`;
        } else {
            this.slidesWrapper.style.transition = "transform 0.3s ease";
            this.slidesWrapper.style.transform = `translateX(-${this.getImagesDistance().distanceX}px)`;
        }
    }

    goBack() {
        this.slideDirection = "backward";
        if (this.slideByCount > 1) {
            this.slidesWrapper.style.transition = "transform 0.3s ease";
            this.slidesWrapper.style.transform = `translateX(${this.getImagesDistance().distanceX * this.slideByCount}px)`;
        } else {
            this.slidesWrapper.style.transition = "transform 0.3s ease";
            this.slidesWrapper.style.transform = `translateX(${this.getImagesDistance().distanceX}px)`;
        }
    }
}