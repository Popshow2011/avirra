const images = [
    {
        url: "https://www.avirra.ru/catalog/product/escalade/?offer=5166",
        description: "cadillac escalade Sport Platinum",
        image:
            "https://avirra.ru/upload/iblock/8d1/8d147fae672c243ac1e03c3ef51e8f3b.png"
    },
    {
        url: "https://www.avirra.ru/catalog/product/land_cruiser_prado/?offer=3660",
        description: "toyota land cruiser prado 2.8D Black Onyx (5 мест)",
        image: "./assets/wwwwwc.jpg"
    },
    {
        url: "https://www.avirra.ru/catalog/product/Free/?offer=5194",
        description: "Voyah Free EVR",
        image: "./assets/wwwwwc.jpg"
    },
    {
        url: "https://www.avirra.ru/catalog/product/gx_460/?offer=3472",
        description: "lexus gx 460 Premium Sport",
        image: "./assets/wwwwwc.jpg"
    }
];

class SlideStories {
    constructor(id) {
        this.slide = document.querySelector(`[data-slide="${id}"]`);
        this.active = 0;
        this.init();
    }

    activeSlide(index) {
        this.active = index;
        this.items.forEach((item) => item.classList.remove("active"));
        this.items[index].classList.add("active");
        this.thumbItems.forEach((item) => item.classList.remove("active"));
        this.thumbItems[index].classList.add("active");

        const meta = document.querySelectorAll(".meta");
        meta.forEach((item) => item.remove());

        document.head.innerHTML += `
    <meta class="meta" property="og:image" content=${images[index].image} />
    <meta class="meta" name="description" content="${images[index].description}" />
    <meta class="meta" property="og:image:secure_url" content=${images[index].image} />
    <meta class="meta" property="og:image:type" content="image/jpeg" />
    <meta class="meta" property="og:image:width" content="400" />
    <meta class="meta" property="og:image:height" content="300" />
    <meta class="meta" property="og:image:alt" content="A shiny red apple with a bite taken out" />
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
        this.timeout = setTimeout(this.next, 5000);
    }

    init() {
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        // this.shareTelegram = this.shareTelegram.bind(this);
        // this.shareWhatsApp = this.shareWhatsApp.bind(this);
        images.map((image) => {
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
        // this.addShareBtn();
        this.addNavigation();
    }
}

new SlideStories("slide");
