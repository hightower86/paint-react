import React from "react";
import toolState from "../store/toolState";

interface Props {}

const SettingBar = (props: Props) => {
  return (
    <div className="setting-bar">
      <label className="ml-2" htmlFor="line-width">
        Line width
      </label>
      <input
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        style={{ margin: "0 10px" }}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
      />
      <label htmlFor="stroke-color">Line (border) color</label>
      <input
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        id="stroke-color"
        type="color"
      />
    </div>
  );
};

export default SettingBar;
