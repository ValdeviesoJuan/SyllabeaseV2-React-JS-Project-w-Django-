import React from "react";
import { Modal as FlowbiteModal, Button } from "flowbite-react";

interface Props {
  show: boolean;                  // whether modal is open
  title: string;                  // modal title
  onClose: () => void;            // close callback
  onSubmit: () => void;           // submit callback
  children?: React.ReactNode;     // allow inner JSX content
}

const Modal: React.FC<Props> = ({ show, title, onClose, onSubmit, children }) => {
  return (
    <FlowbiteModal show={show} size="md" popup={true} onClose={onClose}>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-2">
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Save</Button>
        </div>
      </div>
    </FlowbiteModal>
  );
};

export default Modal;
