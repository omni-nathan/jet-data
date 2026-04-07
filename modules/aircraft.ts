import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const res = await fetch("https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/aircraft.json");
  let data = await res.json();
  
  const { searchParams } = new URL(request.url);
  
  // Filter by Type (e.g., ?type=Stealth)
  const type = searchParams.get("type");
  if (type) {
    data = data.filter((a: any) => a.type.toLowerCase().includes(type.toLowerCase()));
  }

  // Filter by Min Year (e.g., ?min_year=2000)
  const minYear = searchParams.get("min_year");
  if (minYear) {
    data = data.filter((a: any) => a.intro_year >= parseInt(minYear));
  }

  return data;
}
