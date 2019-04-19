import { confirm } from '../utils/mailer';
import User from '../models/user.model';
import Movie from '../models/movie.model';

export const renderHomePage = async (req, res) => {
  try {
    const movies = await Movie.find({ allowBooking: false });
    return res.render('index.js', { movies });
  } catch (error) {
    return res.render('result.js', {
      title: 'Opps!',
      message: `Xin lỗi, đã có chuyện chẳng lành xảy ra: ${error.message}`,
    });
  }
};

//  Copypasta from https://stackoverflow.com/a/1584377
function arrayUnique(array) {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
}

export const submitForm = async (req, res) => {
  try {
    const { name, email, movies } = req.body;
    if (!movies || !movies.length) {
      throw new Error('Chưa chọn phim nào!');
    }
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, movies });
    } else {
      user.name = name;
      user.movies = arrayUnique([...user.movies, ...movies]);
      user = await user.save();
    }
    await confirm(user);
    return res.render('result.js', {
      title: 'Hoàn tất!',
      message: `Cảm ơn ${user.name}, bạn sẽ nhận thông báo tới email ${
        user.email
      } mỗi khi ${user.movies.length} phim bạn chọn bắt đầu bán vé!`,
    });
  } catch (error) {
    console.log(error);
    return res.render('result.js', {
      title: 'Opps!',
      message: `Xin lỗi, đã có chuyện chẳng lành xảy ra: ${error.message}`,
    });
  }
};

export const cancel = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new Error('No user found!');
    }

    await User.deleteOne({ _id: id });
    return res.render('result.js', {
      title: 'Hoàn tất!',
      message: `Bạn đã huỷ đăng ký thành công!`,
    });
  } catch (error) {
    console.log(error);
    return res.render('result.js', {
      title: 'Opps!',
      message: `Xin lỗi, đã có chuyện chẳng lành xảy ra: ${error.message}`,
    });
  }
};
