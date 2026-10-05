import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata = {
  title: "404",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <div>{children}</div>
    </div>
  );
}
