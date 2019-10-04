import React, { useState, ReactNode, useEffect } from 'react';
import Head from 'next/head';

const Page = (props: { title: string; children: ReactNode }) => {
  return (
    <div>
      <Head>
        <title>{props.title} | codelympics.dev</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/static/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/static/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/static/favicon-16x16.png'
        />
        <link rel='manifest' href='/static/site.webmanifest' />
      </Head>

      {props.children}
    </div>
  );
};

export default Page;
