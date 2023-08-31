import axios from 'axios';

import { notify } from './mailer';
import Movie from '../models/movie.model';
import User from '../models/user.model';

async function getStatus(id) {
  const { data } = await axios.get(
    `https://www.galaxycine.vn/api/session/movie/${id}`
  );
  return data;
}

async function getUserToNoti(id) {
  return await User.find({ movies: id });
}

export async function getMovies() {
  const { data } = await axios.get(
    'https://www.galaxycine.vn/api/movie/showAndComming'
  );
  if (!data) return [];
  return [...data.movieShowing, ...data.movieCommingSoon];
}

export async function checkBookingStatus() {
  try {
    const movies = await getMovies();
    let newCount = 0;
    let notiCount = 0;
    const result = await Promise.all(
      movies.map(async item => {
        const status = await getStatus(item.id);
        const allowBooking = status.length > 0;
        let mv = await Movie.findOne({ id: item.id });
        if (mv) {
          if (!mv.allowBooking && allowBooking) {
            mv.allowBooking = true;

            // Notification
            const users = await getUserToNoti(mv.id);
            console.log(
              `${new Date()}: Sent notification to ${
                users.length
              } user for the movie ${mv.name}.`
            );
            if (users.length > 0) {
              await notify(mv, users.map(user => user.email));
              notiCount += users.length;
            }

            mv = await mv.save();
          } else if (mv.allowBooking && !allowBooking) {
            mv.allowBooking = false;
            mv = await mv.save();
          }
          return mv;
        }
        mv = await Movie.create({ ...item, allowBooking });
        newCount++;

        return mv;
      })
    );

    console.log(`
    =====================================================================================
      Checked at ${new Date()}: ${movies.length} movies (${newCount} new).
      Sent ${notiCount} notifications.
    =====================================================================================
    `);
    return result;
  } catch (error) {
    console.log(error);
  }
}
