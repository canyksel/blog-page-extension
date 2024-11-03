import type { ReactElement } from "react";
import PageViewCounter from "../components/PageViewCounter";
import { calculateReadingTime } from "../hooks/functions";
import ClockIcon from "../icons/clock-icon";

export default function Page(): ReactElement {
  const page = {
    name: "Example Page -2",
    title: "Example Page Title -2",
    description: "Example page description -2",
    link: "/example-2",
    wordConunt: 1380
  };
  return (
    <div className="h-screen bg-white text-black font-normal">
      <div className="container  flex flex-col border borde-lightGray w-96 p-4 shadow-lg">
        <h1 className="text-2xl">
          <strong>Page Name: </strong>
          <span className="text-blue-700">{page.name}</span>
        </h1>
        <p className="text-lg">
          <strong>Page Title: </strong>
          <span className="text-blue-700">{page.title}</span>
        </p>
        <p>
          <strong>Description: </strong>
          <span className="text-blue-700">{page.description}</span>
        </p>
        <PageViewCounter link={page.link} />
        <p className="inline-flex items-center"><ClockIcon className="w-4 h-4 mr-2"/>{calculateReadingTime(page.wordConunt)}</p>
      </div>
    </div>
  );
}
