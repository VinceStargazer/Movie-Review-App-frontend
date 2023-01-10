import React from "react";
import Badge from "./Badge";
import Label from "./Label";

export default function LabelWithBadge({ children, htmlFor, badge = 0 }) {
  return (
    <div className="relative">
      <Label htmlFor={htmlFor}>{children}</Label>
      <Badge badge={badge} />
    </div>
  );
}
