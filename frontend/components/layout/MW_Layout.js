import * as React from "react";
import Head from "next/head";

class MW_Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, user } = this.props;
    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="og:title" content={process.env.sitetitle} />
          <title>{process.env.sitetitle}</title>
        </Head>
        <main>{children}</main>
      </>
    );
  }
}

export default MW_Layout;
