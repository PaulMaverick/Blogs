import { redirect } from 'next/navigation';

export function encodedRedirect(
    type: "error" | "success",
    path: string,
    message: string,
  ) {
    return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}
  
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = { month: "long" };
  const month = new Intl.DateTimeFormat("en-US", options).format(date);

  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};