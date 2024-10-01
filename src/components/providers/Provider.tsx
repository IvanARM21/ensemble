import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";


export const Provider = ({ Component, pageProps: { session, ...pageProps }, }: AppProps<{session: Session}>) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
