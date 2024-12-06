import { FC } from "react";

interface LogoProps {}

export const Logo: FC<LogoProps> = () => {
  return <span className="text-2xl font-lobster">Postly</span>;
};
