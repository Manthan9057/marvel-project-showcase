import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Manthan Jain — Full Stack Developer" },
      { name: "description", content: "Portfolio of Manthan Jain, a full stack developer building scalable web applications." },
      { name: "author", content: "Manthan Jain" },
      { property: "og:title", content: "Manthan Jain — Full Stack Developer" },
      { property: "og:description", content: "Portfolio of Manthan Jain, a full stack developer building scalable web applications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@ManthanJain" },
      { name: "twitter:title", content: "Manthan Jain — Full Stack Developer" },
      { name: "twitter:description", content: "Portfolio of Manthan Jain, a full stack developer building scalable web applications." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0b20df8c-a120-4405-b710-5fcbd1d82358/id-preview-50c6251e--9b292034-8f4a-4ef1-ac92-af380ae624c8.lovable.app-1775906846579.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0b20df8c-a120-4405-b710-5fcbd1d82358/id-preview-50c6251e--9b292034-8f4a-4ef1-ac92-af380ae624c8.lovable.app-1775906846579.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={appCss} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
