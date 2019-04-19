import React, { Component } from 'react';

import Layout from './layouts/default';

class ResultPage extends Component {
  render() {
    const { title, message } = this.props;
    return (
      <Layout title={title}>
        <h1 className="title">Novietify</h1>
        <h5 className="subtitle">
          Trở thành người đầu tiên đặt vé xem phim 🍿
        </h5>
        <div style={{ textAlign: 'center', padding: '100px 0px' }}>
          <h3>{title}</h3>
          <p style={{ maxWidth: 400, margin: '30px auto' }}>{message}</p>
          <a href="/">Quay về trang chủ</a>
        </div>
      </Layout>
    );
  }
}

export default ResultPage;
