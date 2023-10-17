"use client";

import React, { type ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

type TabsProps = {
  tab: {
    header: string;
    content: ReactNode;
  }[];
};
function Tabs({ tab }: TabsProps) {
  const [activeTab, SetActiveTab] = useState(0);

  return (
    <section className="flex flex-col gap-2">
      <nav className="inline-flex">
        {tab.map((panel, index) => (
          <button
            key={panel.header}
            onClick={() => SetActiveTab(index)}
            className={twMerge(
              activeTab === index
                ? "cursor-default border-orange-200 font-bold text-orange-200"
                : "text-white hover:border-orange-300 hover:text-orange-300",
              "border-b-2 p-2 ",
            )}
          >
            {panel.header}
          </button>
        ))}
      </nav>
      {tab.map((panel, index) => index === activeTab && panel.content)}
    </section>
  );
}

type PanelProps = {
  header: string;
  children: ReactNode;
};

function Panel({ children }: PanelProps) {
  return children;
}

Tabs.Panel = Panel;
export default Tabs;
