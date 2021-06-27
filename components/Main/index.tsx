import Header from "./Header";
import { ReactNode } from "react";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export default function Main({ children }: Props) {
  return (
    <div className="w-main h-full bg-gradient-to-t from-start to-end overflow-y-scroll no-scrollbar pb-4">
      <Header />
      {children}
    </div>
  );
}
