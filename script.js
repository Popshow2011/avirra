const images = [
  {
    id: 0,
    url: "https://avirra.ru/catalog/product/gx_460/?offer=3472",
    description: "lexus gx 460 Premium Sport",
    image: "https://popshow2011.github.io/avirra/assets/car2.jpeg",
  },
  {
    id: 1,
    url: "https://avirra.ru/catalog/product/escalade/?offer=5166",
    description: "cadillac escalade Sport Platinum",
    image: "https://popshow2011.github.io/avirra/assets/car2.jpeg",
  },
  {
    id: 2,
    url: "https://avirra.ru/catalog/product/x5/?offer=4878",
    description: "bmw x5 xDrive40i",
    image: "https://popshow2011.github.io/avirra/assets/car2.jpeg",
  },
  {
    id: 3,
    url: "https://avirra.ru/catalog/product/land_cruiser_300/?offer=5125",
    description: "toyota land cruiser 300 3.5 AT Премиум",
    image: "https://popshow2011.github.io/avirra/assets/car2.jpeg",
  },
];

class SlideStories {
  constructor(id) {
    this.slide = document.querySelector(`[data-slide="${id}"]`);
    this.share = null;
    this.active = 0;
    this.init();
  }

  activeSlide(index) {
    document.getElementById("ogTitle").content = images[index].description;
    document.getElementById("ogDescription").content =
      images[index].description;
    document.getElementById("ogUrl").content = images[index].url;
    document.getElementById("ogImage").content = images[index].image;

    this.active = index;
    this.items.forEach((item) => item.classList.remove("active"));
    this.items[index].classList.add("active");
    this.thumbItems.forEach((item) => item.classList.remove("active"));
    this.thumbItems[index].classList.add("active");
    this.updateShareButtons();

    this.autoSlide();
  }

  prev() {
    if (this.active > 0) {
      this.activeSlide(this.active - 1);
    } else {
      this.activeSlide(this.items.length - 1);
    }
  }

  next() {
    if (this.active < this.items.length - 1) {
      this.activeSlide(this.active + 1);
    } else {
      this.activeSlide(0);
    }
  }

  addNavigation() {
    const nextBtn = this.slide.querySelector(".slide-next");
    const prevBtn = this.slide.querySelector(".slide-prev");
    nextBtn.addEventListener("click", this.next);
    prevBtn.addEventListener("click", this.prev);
  }

  addThumbItems() {
    this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
    this.thumbItems = Array.from(this.thumb.children);
  }

  autoSlide() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.next, 15000);
  }

  updateShareButtons() {
    if (!this.share) return;

    this.share.updateContentByService({
      telegram: {
        url: `${images[this.active].url}`,
        title: `${images[this.active].description}`,
        description: `${images[this.active].description}`,
        image: `${images[this.active].image}`,
      },
      whatsapp: {
        url: `${images[this.active].url}`,
        title: `${images[this.active].description}`,
        description: `${images[this.active].description}`,
        image: `${images[this.active].image}`,
      },
    });
  }

  initShareButtons() {
    const shareWrapper = document.querySelector(".share_btn_wrapper");

    this.share = Ya.share2(shareWrapper, {
      content: {
        url: `${images[this.active].url}`,
        title: `${images[this.active].description}`,
        description: `${images[this.active].description}`,
        image: `${images[this.active].image}`,
      },
      theme: {
        services: "telegram,whatsapp,vkontakte",
        lang: "ru",
        limit: 3,
        size: "l",
        bare: false,
      },
      contentByService: {
        telegram: {
          url: `${images[this.active].url}`,
          title: `${images[this.active].description}`,
          description: `${images[this.active].description}`,
          image: `${images[this.active].image}`,
        },
        whatsapp: {
          url: `${images[this.active].url}`,
          title: `${images[this.active].description}`,
          description: `${images[this.active].description}`,
          image: `${images[this.active].image}`,
        },
      },
    });
  }

  init() {
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    images.forEach((image) => {
      const slider = document.querySelector(".slide-items");
      const newElem = document.createElement("img");
      slider.append(newElem);
      newElem.src = image.image;
      newElem.alt = image.description;
    });
    this.items = this.slide.querySelectorAll(".slide-items > *");
    this.thumb = this.slide.querySelector(".slide-thumb");
    this.addThumbItems();
    this.activeSlide(0);
    this.initShareButtons();
    // this.addShareBtn();
    this.addNavigation();
  }
}

new SlideStories("slide");
