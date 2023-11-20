const images = [
  {
    url: "https://avirra.ru/catalog/product/gx_460/?offer=3472",
    description: "lexus gx 460 Premium Sport",
    image:
      "https://5koleso.ru/wp-content/uploads/2020/01/fim_8095-1024x683.jpg",
  },
  {
    url: "https://avirra.ru/catalog/product/escalade/?offer=5166",
    description: "cadillac escalade Sport Platinum",
    image:
      "https://motor.ru/thumb/1500x0/filters:quality(75):no_upscale()/imgs/2021/09/10/07/4882813/ef2d145a355b3a45d46f26322f244f993bf43cb2.jpg",
  },
  {
    url: "https://avirra.ru/catalog/product/x5/?offer=4878",
    description: "bmw x5 xDrive40i",
    image:
      "https://cdn.bmwblog.com/wp-content/uploads/2019/01/2019-BMW-X5-xDrive40i-20-of-46.jpg",
  },
  {
    url: "https://avirra.ru/catalog/product/land_cruiser_300/?offer=5125",
    description: "toyota land cruiser 300 3.5 AT Премиум",
    image: "https://iat.ru/uploads/origin/models/658525/3.webp",
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
    this.active = index;
    this.items.forEach((item) => item.classList.remove("active"));
    this.items[index].classList.add("active");
    this.thumbItems.forEach((item) => item.classList.remove("active"));
    this.thumbItems[index].classList.add("active");
    this.updateShareButtons();
    const meta = document.querySelectorAll(".meta");

    meta.forEach((item) => item.remove());
    this.active = index;
    this.items.forEach((item) => item.classList.remove("active"));
    this.items[index].classList.add("active");
    this.thumbItems.forEach((item) => item.classList.remove("active"));
    this.thumbItems[index].classList.add("active");

    meta.forEach((item) => item.remove());
    this.title = "";
    this.description = "";
    this.url = "";
    this.imageUrl = "";

    document.getElementById("ogTitle").content = images[index].description;
    document.getElementById("ogDescription").content =
      images[index].description;
    document.getElementById("ogUrl").content = images[index].url;
    document.getElementById("ogImage").content = images[index].image;
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
    this.share.updateContent({
      title: `${images[this.active].description}`,
      description: `${images[this.active].description}`,
      url: `${images[this.active].url}`,
      image: `${images[this.active].image}`,
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
        services: "telegram,whatsapp",
        lang: "ru",
        limit: 3,
        size: "l",
        bare: false,
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
