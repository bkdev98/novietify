/**
 * Deprecated
 */

import rp from 'request-promise';
import cheerio from 'cheerio';

import Movie from '../models/movie.model';

async function crawlMovies() {
  try {
    const data = [];
    const crawlOptions = {
      uri: 'https://www.galaxycine.vn/phim-sap-chieu',
      transform(body) {
        return cheerio.load(body);
      },
    };
    const $ = await rp(crawlOptions);
    $('#tab_onshow > .watchmovie-group > div').each((index, value) => {
      let title = $(value)
        .find('.vn')
        .text();
      if (!title) {
        title = $(value)
          .find('.upper-text')
          .text();
      }
      const thumbnail = $('.article-watchmovie > img', value)[0].attribs.src;
      const url = $('.article-watchmovie > a', value)[0].attribs.href;
      data.push({ title, thumbnail, url });
    });
    $('#tab_oncomming > .watchmovie-group > div').each((index, value) => {
      let title = $(value)
        .find('.vn')
        .text();
      if (!title) {
        title = $(value)
          .find('.upper-text')
          .text();
      }
      const thumbnail = $('.article-watchmovie > img', value)[0].attribs.src;
      const url = $('.article-watchmovie > a', value)[0].attribs.href;
      data.push({ title, thumbnail, url });
    });
    return data;
  } catch (error) {
    throw error;
  }
}

async function crawlBookingStatus(url) {
  try {
    const crawlOptions = {
      uri: `https://www.galaxycine.vn${url}`,
      timeout: 5000,
      transform(body) {
        return cheerio.load(body);
      },
    };
    const $ = await rp(crawlOptions);
    const result = $('.ng-hide').length;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUpcomingMovies() {
  try {
    const movies = await crawlMovies();
    const result = await Promise.all(
      movies.map(async item => {
        const status = await crawlBookingStatus(item.url);
        console.log(item.title, ': ', status);
        let mv = await Movie.findOne({ url: item.url });
        if (mv) {
          return mv;
        }
        mv = await Movie.create(item);
        return mv;
      })
    );
    console.log('Movies: ', result.length);
    return result;
  } catch (error) {
    throw error;
  }
}
