import * as React from "react";
import SplitNum from "./SplitNum";

const names = [9, 8, 7, 6, 5, 4, "z", "y", "x"];

function Item({ num }: { num: string }) {
  const splitNum = new SplitNum(num);
  const { mantisa, exponent } = splitNum.formatted;
  const handleCopy = () => {
    navigator.clipboard.writeText(mantisa + (!!exponent ? "e" + exponent : ""));
  };
  return (
    <button className="result" onClick={handleCopy}>
      <div className="mantisa">{mantisa}</div>
      <div className="exponent">
        {!!exponent && (
          <>
            <div className="sup">{exponent}</div>
            <div className="sub">×10</div>
          </>
        )}
      </div>
    </button>
  );
}

export default function Stack({
  commands,
  stack
}: {
  commands: Array<string>;
  stack: Array<string>;
}) {
  return (
    <>
      <div className="marks">
        {names.map((e) => (
          <button key={e}>{e}</button>
        ))}
      </div>
      {!!commands.length && (
        <div className="stack">
          {stack.map((e, i) => (
            <Item key={i} num={e} />
          ))}
        </div>
      )}
    </>
  );
}
