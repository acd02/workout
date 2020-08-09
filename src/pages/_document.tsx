import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

/* eslint-disable-next-line fp/no-class */
export default class MyDocument extends Document {
  public render() {
    return (
      <Html {...{ lang: 'en' }}>
        <Head>
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
          <link rel="stylesheet" type="text/css" href="/reset.css" />
        </Head>
        <body>
          {/* see: https://stackoverflow.com/questions/48516766/css-doesnt-block-rendering-on-firefox-quantum */}
          {process.env.NODE_ENV === 'production' && <script>0</script>}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
