import { AuthProvider } from "@/providers/auth-provider";
import { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../styles/globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spotify Login",
  description: "Entre com sua conta Spotify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={rubik.variable}>
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/424dca828dee407629efe273d0a28630?family=Spotify+Mix"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${rubik.variable} font-primary`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
