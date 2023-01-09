import Document, { Html, Head, Main, NextScript } from 'next/document';

const Element: React.FC<any> = ({ ...props }) => <Head {...props} />;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-GB">
        <Element>
          <meta
            name="description"
            content="Inheaden is your reliable partner in achieving your business goals. We believe in technology, master it for our partners and clients and always strive for perfection."
          />

          <meta property="og:title" content="Inheaden" />
          <meta property="og:site_name" content="Inheaden" />
          <meta property="og:url" content="https://inheaden.io" />
          <meta
            property="og:description"
            content="Inheaden is your reliable partner in achieving your business goals. We believe in technology, master it for our partners and clients and always strive for perfection."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://cdn.inheaden.cloud/brand/RR-Logotype-Slogan/Color/PNG/RR-LT%2BSL_18X9_SW.png"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://inheaden.io" />
          <meta property="twitter:title" content="Inheaden" />
          <meta
            property="twitter:description"
            content="Inheaden is your reliable partner in achieving your business goals. We believe in technology, master it for our partners and clients and always strive for perfection."
          />
          <meta
            property="twitter:image"
            content="https://cdn.inheaden.cloud/brand/RR-Logotype-Slogan/Color/PNG/RR-LT%2BSL_18X9_SW.png"
          />
        </Element>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
