//Slider
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  spaceBetween: 20,
  freeMode: true,
  breakpoints: {  
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1080: {
      slidesPerView: 5,
      spaceBetween: 30,
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//Fetch data API
const cryptoNameSymbol = document.querySelector("#crypto-data");
const setCryptoData = (cryptoData) => {
  let allCryptoData = '';
  let cryptoMaxNumberToShow = 5;

  for (let i = 0; i < cryptoMaxNumberToShow; i++) {
      let newCrypto = `
      <div class="crypto-card">
          <div class="card-details">
              <div class="card-heading">
                  <img src="./images/crypto-${[i]}.png" alt="Bitcoin">
                  <h5>${cryptoData[i].symbol}</h5>
                  <span>${cryptoData[i].name}</span>
              </div>
              <hr>
              <div class="card-content">
                  <h4>$${cryptoData[i].price_usd}</h4>
                  ${cryptoData[i].percent_change_24h < 0 ? `<i class="fa-solid fa-angle-down value-down"></i> <span style="color: #FFA3A6;">${cryptoData[i].percent_change_24h}%</span>` : `<i class="fa-solid fa-angle-up value-up"></i> <span style="color: #B1FFC2;">${cryptoData[i].percent_change_24h}%</span>`}
              </div>
          </div>
      </div>
      `
      allCryptoData += newCrypto;
  }
  cryptoNameSymbol.innerHTML = allCryptoData;
}

const fetchCryptoData = () => {
  fetch('https://api.coinlore.net/api/tickers/').then((response) => response.json()).then((data) => {
    setCryptoData(data.data.slice(0, 5))
  });
}

fetchCryptoData()