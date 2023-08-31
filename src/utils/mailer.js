import nodemailer from 'nodemailer';

import constants from '../config/constants';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  auth: {
    user: constants.EMAIL_USER,
    pass: constants.EMAIL_PASS,
  },
});

export const confirm = async user =>
  await transporter.sendMail({
    from: constants.EMAIL_USER,
    to: user.email,
    subject: `[Novietify] Đăng kí thành công!`,
    html: `<p>Xin chào ${
      user.name
    },</p><p>Chúng tôi đã nhận được yêu cầu của bạn trên <a href='${
      constants.HOSTNAME
    }'>Novietify</a>.</p><p>Bạn sẽ nhận được email thông báo mỗi khi Galaxy Cinema mở bán vé những bộ phim bạn đã chọn.</p><p>Nếu bạn không phải là người đăng kí, hoặc muốn huỷ đăng kí, nhấn <a href='${
      constants.HOSTNAME
    }/cancel/${user._id}'>vào đây</a>.</p><p><a href='${
      constants.HOSTNAME
    }'>Novietify</a> - Trở thành người đầu tiên đặt vé xem phim 🍿</p>`,
  });

export const notify = async (movie, emailList) =>
  await transporter.sendMail({
    from: constants.EMAIL_USER,
    to: emailList.join(', '),
    subject: `[Novietify] Bộ phim ${movie.name} đã cho đặt vé!`,
    html: `<p>Galaxy Cinema vừa mở bán vé cho bộ phim <b>${
      movie.name
    }</b>. Đặt ngay trước khi quá trễ!</p><p>Link đặt vé: <a href='https://www.galaxycine.vn/dat-ve/${
      movie.slug
    }'>${movie.name}</a></p><p><a href='${
      constants.HOSTNAME
    }'>Novietify</a> - Trở thành người đầu tiên đặt vé xem phim 🍿</p>`,
  });
