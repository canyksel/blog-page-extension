import type { ReactElement } from "react";
import PageViewCounter from "../components/PageViewCounter";
import { calculateReadingTime } from "../hooks/functions";
import ClockIcon from "../icons/clock-icon";

export default function Page(): ReactElement {
  const page = {
    name: "Example Page",
    title: "Example Page Title",
    description: "Example page description",
    link: "/example",
    wordConunt: 1850
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
