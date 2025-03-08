import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

export const UNLOGGED_CONTAINER =
  "w-screen min-h-screen flex flex-col items-center justify-center gap-20";

export const LOGGED_CONTAINER =
  "w-[100%] min-h-[calc(100vh-60px)] flex flex-col items-center justify-center gap-10";

export const GENERAL_CONTAINER = " min-h-screen mb-20";

export const RECOMMENDATIONS_CARD_GRID =
  "flex-1 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-10 pl-8 pr-8";

export const LoggedContainer = ({ children }: { children: ReactNode }) => (
  <div className={GENERAL_CONTAINER}>
    <Navbar />

    <div className={LOGGED_CONTAINER}>{children}</div>
  </div>
);
