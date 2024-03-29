import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          data-partytown-config
          dangerouslySetInnerHTML={{
            __html: `
            partytown = {
              lib: '/_next/static/~partytown/',
              debug: true,
              forward: ['dataLayer.push']
            };
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
