import { cookies } from "next/headers";

export const getTheme = async () => {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  if (theme) {
    return theme.value;
  }
  return undefined;
};

export const setTheme = async (theme: string) => {
  const cookieStore = await cookies();
  cookieStore.set("theme", theme);
};

export const deleteTheme = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("theme");
};
