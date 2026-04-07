import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  // 1. Fetch your data directly from your GitHub 'Raw' link
  // Replace 'YOUR_USER' and 'YOUR_REPO' with your actual GitHub details
  const DATA_URL = "https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/aircraft.json";
  
  const response = await fetch(DATA_URL);
  const data = await response.json();

  // 2. Add filtering (Optional but useful)
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");

  if (year) {
    return data.filter((a: any) => a.intro_year === parseInt(year));
  }

  return data;
}
