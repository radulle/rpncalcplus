import * as React from "react";
import { classNames } from "./utils";

export default function Header({
  mod,
  toggleMod
}: {
  mod: Set<string>;
  toggleMod: (key: string, set?: boolean) => () => void;
}) {
  return (
    <div className="header">
      <div className="title">RPNcalc+</div>
      <button
        onClick={toggleMod("deg")}
        className={classNames(["teal", !!mod.has("deg") && "active"])}
      >
        {mod.has("deg") ? "deg" : "rad"}
      </button>
      <button
        onClick={toggleMod("help")}
        className={classNames(["teal", !!mod.has("help") && "active"])}
      >
        help
      </button>
    </div>
  );
}
