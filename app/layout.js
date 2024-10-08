import { Bricolage_Grotesque } from "next/font/google";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#fefce8",
  width: "device-width",
  initialScale: 1,
};

export const metadata = getSEOTags();

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="#fefce8"
      className={font.className + " bg-yellow-50"}
    >
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
