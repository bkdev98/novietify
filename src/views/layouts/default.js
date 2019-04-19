import React, { Component } from 'react';

import constants from '../../config/constants';

class Layout extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <html lang="vi">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:title" content="Trang chủ | Novietify" />
          <meta
            property="og:description"
            content="Trở thành người đầu tiên đặt vé xem phim 🍿"
          />
          <meta property="og:url" content={constants.HOSTNAME} />
          <meta property="og:site_name" content="Novietify" />
          <meta property="og:image" content="/public/images/screenshot.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content="Trở thành người đầu tiên đặt vé xem phim 🍿"
          />
          <meta name="twitter:title" content="Trang chủ | Novietify" />
          <meta name="twitter:image" content="/public/images/screenshot.png" />
          <meta name="twitter:creator" content="@qckhnh" />
          <title>{title} | Novietify</title>
          <link
            rel="icon"
            type="image/x-icon"
            href="/public/images/favicon.ico"
          />
          <link rel="stylesheet" href="/public/css/style.css" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-121546163-3"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-121546163-3');
          `,
            }}
          />
        </head>
        <body>{children}</body>
        <footer>
          <p>
            Tạo ra nhờ 🍻 bởi{' '}
            <a href="https://qckhnh.com" target="__blank">
              Quốc Khánh
            </a>
          </p>
        </footer>
      </html>
    );
  }
}

export default Layout;
