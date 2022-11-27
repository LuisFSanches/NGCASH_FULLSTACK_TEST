/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";

import { Button } from "./style";

interface IActionButton {
  label: string;
  color: string;
  onClick: () => void;
  icon?: any;
  style?: CSSProperties;
}

export function ActionButton({
  label,
  color,
  onClick,
  icon = null,
  style = {},
}: IActionButton) {
  return (
    <Button color={color} onClick={onClick} style={style}>
      {icon && (
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
      )}

      {label}
    </Button>
  );
}
