const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const Película = require('../api/models/movie');
require('dotenv').config();


const Movies = [];

const urlsMovies = [
  {
    url: "https://www.elcorteingles.es/cine/anime/",
    category: "Anime"
  },
  {
    url: "https://www.elcorteingles.es/cine/clasico/",
    category: "Clásico"
  },
  {
    url: "https://www.elcorteingles.es/cine/comedia/",
    category: "Comedia"
  },
  {
    url: "https://www.elcorteingles.es/cine/drama/",
    category: "Drama"
  },
  {
    url: "https://www.elcorteingles.es/cine/terror/",
    category: "Terror"
  }
]

const scrap = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    for (const info of urlsMovies) {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();

      await page.goto(info.url);
      await page.setViewport({ width: 1080, height: 1024 });

      const products = await page.$$(".products_list-item");

      for (const product of products) {
        const movie = {
          image: "",
          director: "",
          title: "",
          price: "",
          category: info.category
        };
        const image = await product.$(".js_preview_image");
        const imagesrc = (await image?.evaluate((el) => el.src)) || "";
        console.log(imagesrc);
        movie.image = imagesrc;

        const director = await product.$(".product_preview-brand");
        const directorname = (await director?.evaluate((el) => el.textContent)) || "";
        console.log(directorname);
        movie.director = directorname;

        const title = await product.$(".product_preview-desc")
        const titletext = (await title?.evaluate((el) => el.textContent.split("(")))[0] || "";
        console.log(titletext);
        movie.title = titletext;

        const price = await product.$(".integer-price")
        const pricetext = (await price?.evaluate((el) => el.textContent)) || "";
        console.log(pricetext);
        movie.price = pricetext;

        Movies.push(movie);
      }

      // Cerrar la página después de haber recopilado la información
      await page.close();
      console.log(`Página de ${info.category} cerrada.`);

      // Cerrar el navegador después de recopilar todas las películas de una categoría
      await browser.close();
      console.log(`Navegador cerrado después de recopilar las películas de ${info.category}.`);
    }

    await Película.insertMany(Movies);
    console.log("Películas añadidas correctamente a la base de datos");
    await mongoose.disconnect();

  } catch (error) {
    console.log(error.message);
  }
}

scrap();
