import path from "path";
import { NextRequest, NextResponse } from "next/server";

// Request body interface
interface RequestBody {
  slug: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  if (request.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (request.headers.get("Content-Type") !== "application/json") {
    return new NextResponse(JSON.stringify({}), { status: 400 });
  }

  const { slug }: RequestBody = await request.json();

  if (!slug) {
    return new NextResponse(
      JSON.stringify({ message: "Blog slug is required" }),
      {
        status: 400,
      }
    );
  }

  const ip = request?.headers.get("x-forwarded-for");
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip?.toString())
  );
  const hash = Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .concat(slug.replaceAll('/','-')); //add page-url end of the has. (In this way, the user will be able to register once for each page with the same ip)
  
  // This is static file. You can implement firebase or another db like redis and store that datas
  const filePath = path.join(process.cwd(), "public", "visits.json");

  var fs = require("fs");

  const fileData = fs.readFileSync(filePath, "utf-8");
  const visits: {
    pageUrl: string;
    viewCount: number;
    countable: boolean;
    ipAddresses: string[];
  }[] = JSON.parse(fileData);

  const isNewUser = !visits?.some((visit) => visit.ipAddresses?.includes(hash));
  // Find a record of the page visited
  const page = visits.find((visit) => visit.pageUrl === slug);

  // Prevent multiple registrations of the same user with same ip
  if (!isNewUser) {
    return new NextResponse(JSON.stringify({count: page ? page.viewCount : 1}), { status: 202 });
  }
  // We can disable specific pages as uncountable with set countable prop as false
  if (page && page.countable) {
    page.viewCount += 1;
    page.ipAddresses.push(hash);
  } 
  
  // else if (!page) {
  //   // Create a new record if the page is not found (this is user's option)
  //   visits.push({
  //     pageUrl: slug,
  //     viewCount: 1,
  //     countable: true,
  //     ipAddresses: new Array(hash),
  //   });
  // }
  else{
    // Return page is not found (this is user's option)
    return new NextResponse(JSON.stringify({message:"Page not found"}), { status: 404 });
  }

  // Write updated data
  fs.writeFileSync(filePath, JSON.stringify(visits, null, 2));

  return new NextResponse(
    JSON.stringify({ count: page ? page.viewCount : 1 }),
    {
      status: 200,
    }
  );
}
