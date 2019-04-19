import React, { Component } from 'react';

import Layout from './layouts/default';

class HomePage extends Component {
  render() {
    const { movies } = this.props;
    return (
      <Layout title="Trang chủ">
        <h1 className="title">Novietify</h1>
        <h5 className="subtitle">
          Trở thành người đầu tiên đặt vé xem phim 🍿
        </h5>
        <form className="info-form" method="POST" action="/">
          <h3>1. Điền thông tin liên hệ:</h3>
          <label htmlFor="name">Tên của bạn</label>
          <input name="name" placeholder="Quốc Khánh" required />
          <label htmlFor="email">Email (để nhận thông báo)</label>
          <input name="email" placeholder="qckhnh@innoteq.vn" required />
          <h3>2. Chọn những bộ phim bạn muốn đặt vé:</h3>
          <div className="movie-list">
            {movies.length ? (
              movies.map(item => (
                <label
                  href={`https://www.galaxycine.vn/dat-ve/${item.slug}`}
                  className="movie-item"
                  key={item.id}
                  htmlFor={item.id}
                >
                  <input
                    type="checkbox"
                    name="movies"
                    value={item.id}
                    id={item.id}
                  />
                  <img
                    src={`https://www.galaxycine.vn${item.imagePortrait}`}
                    alt="thumbnail"
                  />
                  <p>{item.name}</p>
                </label>
              ))
            ) : (
              <p style={{ textAlign: 'center' }}>Không có dữ liệu phim</p>
            )}
          </div>
          <input type="submit" value="Nhận thông báo" />
        </form>
      </Layout>
    );
  }
}

export default HomePage;
