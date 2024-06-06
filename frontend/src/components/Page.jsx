import React from "react";
import NavOptions from "./NavOptions";
import Content from "./Content";

function Page() {
  return (
    <div>
      <NavOptions menuStyle="menu-options-list" menuItemstyle="menu-options-list-item" />
      <Content />
    </div>
  );
}

export default Page;
