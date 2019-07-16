//list-group
import React, { useState } from "react";
import { TopTokenItem } from "../types";
import "../style/bootstrap.min.css";
import "./ListWithBadges.css";

interface Props {
  label: string;
  items: Array<TopTokenItem>;
}

export default function ListWithBadges(props: Props) {
  const [copiedIdx, setCopiedIdx] = useState(-1);
  return (
    <div className="ListWithBadges">
      <h5>{props.label}</h5>
      {props.items.length > 0
        ? renderList(props, copiedIdx, setCopiedIdx)
        : renderEmpty()}
    </div>
  );
}

function renderList(
  props: Props,
  copiedIdx: number,
  setCopiedIdx: Function
): React.ReactNode {
  function selectInputContents(evt: any) {
    const input = evt.target as HTMLInputElement;
    const inputIdx = parseInt(input.getAttribute("data-idx") || "-1", 0);
    input.setSelectionRange(0, input.value.length);
    document.execCommand("copy");
    input.setSelectionRange(0, 0);
    input.blur();
    setCopiedIdx(inputIdx);

    evt.preventDefault();
  }
  return (
    <ul className="list-group">
      {props.items.map((tokenItem: TopTokenItem, idx: number) => {
        return (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={idx}
          >
            <input
              type="text"
              data-idx={idx}
              value={`/${tokenItem.token}`}
              onClick={selectInputContents}
            />
            {copiedIdx === idx ? (
              <span className="copiedText">Copied!</span>
            ) : null}
            <span className="badge badge-primary badge-pill">
              {tokenItem.count}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function renderEmpty() {
  return (
    <div className="emptyList">
      No memes found, try choosing from another list!
    </div>
  );
}