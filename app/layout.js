import StoreProvider from "@/redux/StoreProvider";
import "./globals.css";

export const metadata = {
  title: "Ultra GPT",
  description: "Ultra GPT a Large Language Model Built By Joshua Akinleye",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
