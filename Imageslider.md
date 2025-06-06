# Слайдер изображений

Данное техническое задание описывает проект абстрактного слайдера, его архитектуру, принципы работы, а также ожидаемые UI и UX.

---

## Функциональность

- Слайдер представляет собой встраиваемую HTML-сущность.
- В нем отображается несколько изображений с кнопками для перелистывания.
- По нажатию на кнопку изображения смещаются на одно вправо или влево, в зависимости от нажатой кнопки.
- "Раскрытие изображений" по клику данным ТЗ не предусматривается.
- Слайдинг/свайпинг пальцами данным ТЗ не предусматривается.
- Слайдер должен быть "бесконечным" (листание изображений должно быть зацикленным).
- У слайдера должно быть "основное изображение", явно выделенное через стили.
- Если загружено меньше изображений, чем требуется для отображения, допускается их дублирование для зацикливания.

---

## Настраиваемость

- Возможность указать элемент-контейнер явно (нет значения по умолчанию).
- Возможность задать количество отображаемых изображений (по умолчанию: `3`).
- Возможность указать номер "основного" изображения среди отображаемых (отсчет с нуля, по умолчанию: `1` — центральное, если указано `-1`, то главных нет).
- Возможность указать количество изображений, перелистываемых при нажатии на кнопки (по умолчанию: `1`).

---

## Архитектура

- Слайдер состоит только из JavaScript и CSS.
- Весь HTML-код генерируется на стороне JavaScript.
- Код слайдера подключается на страницу только в виде JS-файла.
- CSS-файл подключается из JavaScript-кода.
- Возможно создание нескольких слайдеров на одной странице. Для этого слайдер добавляется при явном вызове конструктора:

  ```javascript
  new ImageSlider(element, imagesCount, mainImageId, slideByCount);
  ```

  Где:
    - `element` — контейнер для слайдера.
    - `imagesCount` — количество отображаемых изображений.
    - `mainImageId` — ID основного изображения.
    - `slideByCount` — количество изображений, перелистываемых за раз.

---

## ES6 Класс `ImageSlider`

Слайдер должен быть описан в виде ES6-класса `ImageSlider` со следующими методами:

- **Конструктор:** инициализирует объект всем необходимым.
- **`loadImages`**: принимает массив ссылок (строки с URL, например, `http...`) на изображения и подготавливает их к отображению.
- **`goForward`**: перелистывает слайдер вперед.
- **`goBack`**: перелистывает слайдер назад.

---

## Технические требования к изображениям

- Изображения загружаются в виде `<img>` и помещаются в контейнеры, размер которых контролируется через CSS.
- Количество контейнеров: `totalImagesCount + (slideByCount * 2)`:
  - `totalImagesCount` - общее количество изображений;
  - Дополнительные контейнеры (`slideByCount`) добавляются слева и справа от основного набора изображений для зацикливания.
- Изображения должны сохранять соотношение сторон даже при несовершенном вписывании в контейнер.
- После прокрутки набор изображений перестраивается для подготовки к следующей прокрутке.

---

## Анимация и плавность

- На первой итерации способ смены изображений не принципиален.
- Плавность смены изображений обеспечивается через:
    - CSS-свойство `transition`.
    - Использование `scrollTo` (в простейшем случае, если требуется).