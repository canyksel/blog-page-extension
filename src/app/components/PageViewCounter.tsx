"use client";

import { ReactElement, useEffect, useState } from "react";
import ViewCountIcon from "../icons/view-count-icon";

interface PageViewCounterProps {
  link: string;
}

export default function PageViewCounter({
  link,
}: PageViewCounterProps): ReactElement {
  const [viewCount, setViewCount] = useState<number>(0);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const updateViewCount = async () => {
      if (!ready) {
        const response = await fetch("api/update-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: link }),
        });

        if (response.ok) {
          const data = await response.json();
          setViewCount(data.count);
          setReady(true);
        }
      }
    };

    updateViewCount();
  }, []);

  return (
    <>
      {ready && (
        <p className="text-black inline-flex items-center">
          View Count: {viewCount} <ViewCountIcon className="w-4 h-4 ml-2" />
        </p>
      )}
    </>
  );
}
