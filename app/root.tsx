import { cssBundleHref } from "@remix-run/css-bundle";
import { Toaster } from "./components/ui/toaster";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
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

export const meta: MetaFunction = () => {
  return [
    { title: "Connect 5 - Football Trivia Game" },
    {
      name: "description",
      content:
        "Test your football knowledge with Connect 5, the ultimate soccer quiz. Play a daily football riddles to test your ball knowledge and see if you know what club all these players played for!",
    },
    {
      name: "keywords",
      content:
        "soccer games, soccer riddle, football trivia game, football quiz game, football soccer quiz, football trivia, football quiz",
    },
    { property: "og:title", content: "Connect 5 - Football Trivia Game" },
    {
      property: "og:description",
      content:
        "Test your football knowledge with Connect 5, the ultimate soccer quiz. Play a daily football riddles to test your ball knowledge and see if you know what club all these players played for!",
    },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Connect 5 - Football Trivia Game" },
    {
      name: "twitter:description",
      content:
        "Test your football knowledge with Connect 5, the ultimate soccer quiz. Play a daily football riddles to test your ball knowledge and see if you know what club all these players played for!",
    },
    { name: "twitter:image", content: "/twitter-image.jpg" },
  ];
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
        <link rel="canonical" href="https://connectfive.games" />
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
