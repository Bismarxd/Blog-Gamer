import React from 'react'
import Header from './Header';
import { Global, css } from '@emotion/react';
import Head from 'next/head';



const Layout = props => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --celeste: #027af9;
            --celeste2: #043d79;
            --celeste3:#002E37;
            --lila: #42005f;
          }

          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,*:before, *:after {
            box-sizing: inherit;
          }

          body {
            font-size: 1.6rem;
            line-height: 1.5;
            font-family: 'Ysabeau', sans-serif;
            margin-bottom: 2rem;
          }

          h1,h2,h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }
          h1,h2 {
            font-family: 'Kanit', sans-serif;
            font-weight: 700;
          }

          h3 {
            font-family: 'Ysabeau', sans-serif;
          }

          ul {
            list-style: none;
          }

          a {
            text-decoration: none;
          }

          img {
            max-width: 100%;
          }
        `}
      />
      <Head>

          <title>Nexo de Ideas</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>         
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Kanit&family=Ysabeau&display=swap" rel="stylesheet"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
          <link href='/static/css/app.css' rel='stylesheet'/>
      </Head>

      <Header />

      <main>{props.children}</main>

    </>
  );
}

export default Layout