import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link
            rel='icon'
            type='image/png'
            sizes='96x96'
            href='/static/favicon.png'
          />
          <meta name='theme-color' content='#319795'></meta>
          <style>{`
          @media (prefers-color-scheme: dark) {
            html, body {
              background-color: #1A202C;
              color: white;
            }

            header {
              background-color: #1A202C !important;
              color: white;
            }

            *, ::before, ::after {
              border-color: rgba(255,255,255,0.16) !important;
            }
          }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
