const images = [
    {
        url: 'https://www.avirra.ru/catalog/product/escalade/?offer=5166',
        description: 'cadillac escalade Sport Platinum',
        image: './assets/wwwwwc.jpg'
    },
    {
        url: 'https://www.avirra.ru/catalog/product/land_cruiser_prado/?offer=3660',
        description: 'toyota land cruiser prado 2.8D Black Onyx (5 мест)',
        image: './assets/wwwwwc.jpg'
    },
    {
        url: 'https://www.avirra.ru/catalog/product/Free/?offer=5194',
        description: 'Voyah Free EVR',
        image: './assets/wwwwwc.jpg'
    },
    {
        url: 'https://www.avirra.ru/catalog/product/gx_460/?offer=3472',
        description: 'lexus gx 460 Premium Sport',
        image: './assets/wwwwwc.jpg'
    },
];


class SlideStories {
    constructor(id) {
      this.slide = document.querySelector(`[data-slide="${id}"]`);
      this.active = 0;
      this.init();
    }
  
    activeSlide(index) {
      this.active = index;
      this.items.forEach((item) => item.classList.remove('active'));
      this.items[index].classList.add('active');
      this.thumbItems.forEach((item) => item.classList.remove('active'));
      this.thumbItems[index].classList.add('active');
    //   document.head.innerHTML += `
    //   <meta name="description" content="${images[index].description}" />
    //   <meta property="og:title" content="${images[index].description}" />
    //   <meta property="og:url" content="${images[index].url}" />
    //   <meta property="og:description" content="${images[index].description}" />
    //   <meta property="og:image" content="${images[index].image}" />
    //   `
    const meta = document.querySelectorAll('.meta')
    meta.forEach(item => item.remove())

          document.head.innerHTML += `
          <meta class="meta" name="description" content="${images[index].description}" />
          <meta class="meta" property="og:title" content="${images[index].description}" />
          <meta class="meta" property="og:url" content="${images[index].url}" />
          <meta class="meta" property="og:description" content="${images[index].description}" />
          <meta class="meta" property="og:image" content="${images[index].image}" />
          `

      // document.head.innerHTML += `
      //   <meta class="meta" property="og:image" content="${images[index].image}" />
      //   <meta class="meta" property="og:image" content="${images[index].image}" />
      //   <meta class="meta" property="og:image" itemprop="image" content="image/png" />
      //   <meta class="meta" property="og:type" content="article" />
      //   <meta class="meta" property="og:image:width" content="400" />
      //   <meta class="meta" property="og:image:height" content="300" />
      //   <meta class="meta" property="og:image" content="A shiny red apple with a bite taken out" />
      // `
      
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
      const nextBtn = this.slide.querySelector('.slide-next');
      const prevBtn = this.slide.querySelector('.slide-prev');
      nextBtn.addEventListener('click', this.next);
      prevBtn.addEventListener('click', this.prev);
    }

    addShareBtn() {
        const shareWA = document.querySelector('.share_wa');
        const shareTG = document.querySelector('.share_tg');

        shareWA.addEventListener('click', this.shareWhatsApp)
        shareTG.addEventListener('click', this.shareTelegram)
    }

    shareWhatsApp() {
        const current = images[this.active];
        const anchor = document.createElement('a');
        anchor.innerHTML= `<link itemprop="thumbnailUrl" href="${current.image}">

        <span itemprop="thumbnail" itemscope itemtype=image/png>
        <link itemprop="url" href="${current.image}">
        </span>`
    
        anchor.href = `whatsapp://send?text=${current.description}: ${current.url}`;
        anchor.target = '_blank';
    
        document.body.appendChild(anchor);
    
        anchor.click();
        document.body.removeChild(anchor);
    }

    shareTelegram() {
        const current = images[this.active];
        console.log(current)
        const anchor = document.createElement('a');
        anchor.innerHTML = '<img src=`${current.image}` alt=`${current.image}` />';
        anchor.href = `https://telegram.me/share/url?url=${current.image}`;
        anchor.target = '_blank';
        anchor.setAttribute('data-telegram-share', current.image);
    

        document.body.appendChild(anchor);

        anchor.click();
        document.body.removeChild(anchor);
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
      this.shareTelegram = this.shareTelegram.bind(this);
      this.shareWhatsApp = this.shareWhatsApp.bind(this);
      images.map(image => {
        const slider = document.querySelector('.slide-items')
        const newElem = document.createElement('img')
        slider.append(newElem);
        newElem.src = image.image;
        newElem.alt = image.description;
      })
      this.items = this.slide.querySelectorAll('.slide-items > *');
      this.thumb = this.slide.querySelector('.slide-thumb');
      this.addThumbItems();
      this.activeSlide(0);
      this.addShareBtn()
      this.addNavigation();
    }
  }
  
  new SlideStories('slide');
