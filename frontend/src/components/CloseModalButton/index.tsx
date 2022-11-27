import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CloseButton } from "./style";

interface ICloseButtonProps {
  onRequestClose: () => void;
}

export function CloseModalButton({ onRequestClose }: ICloseButtonProps) {
  return (
    <CloseButton type="button" onClick={onRequestClose} className="modal-close">
      <FontAwesomeIcon icon={faXmark} />
    </CloseButton>
  );
}
