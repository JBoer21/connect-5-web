import { cssBundleHref } from "@remix-run/css-bundle";
import { Toaster } from "./components/ui/toaster";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { getTheme } from "./lib/theme.server";
import {
  ClientHintCheck,
  getHints,
  useNonce,
  useTheme,
} from "./lib/client-hints";
import { Header } from "./components/ui/info/header";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({
    requestInfo: {
      hints: getHints(request),
      userPrefs: {
        theme: getTheme(request),
      },
    },
  });
};

export default function App() {
  const theme = useTheme();
  const nonce = useNonce();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <ClientHintCheck nonce={nonce} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Connect Five</title>
      </head>
      <body>
        <Analytics />
        <Toaster />
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
