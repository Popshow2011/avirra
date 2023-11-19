const images = [
  {
    url: "https://avirra.ru/catalog/product/gx_460/?offer=3472",
    description: "lexus gx 460 Premium Sport",
    image:
      "https://avirra.ru/upload/iblock/b8d/b8d4ec19ef84b13d8456629a67085f78.png",
  },
  {
    url: "https://avirra.ru/catalog/product/escalade/?offer=5166",
    description: "cadillac escalade Sport Platinum",
    image:
      "https://avirra.ru/upload/iblock/8d1/8d147fae672c243ac1e03c3ef51e8f3b.png",
  },
  {
    url: "https://avirra.ru/catalog/product/x5/?offer=4878",
    description: "bmw x5 xDrive40i",
    image:
      "https://avirra.ru/upload/iblock/18f/18f53cd4a6e118584f87b7184262ce69.png",
  },
  {
    url: "https://avirra.ru/catalog/product/land_cruiser_300/?offer=5125",
    description: "toyota land cruiser 300 3.5 AT Премиум",
    image:
      "https://avirra.ru/upload/iblock/bd4/bd4550db28d9fbcff35527c9947b97e5.png",
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

    document.head.innerHTML += `
          <meta class="meta" name="description" content="${images[index].description}" />
          <meta class="meta" property="og:title" content="${images[index].description}" />
          <meta class="meta" property="og:url" content="${images[index].url}" />
          <meta class="meta" property="og:description" content="${images[index].description}" />
          <meta class="meta" property="og:image" content="${images[index].image}" />
          `;
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
