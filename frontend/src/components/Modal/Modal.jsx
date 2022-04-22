import React from "react";

import ReactDom from "react-dom";

import "./Modal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

const ModalOverLay = (props) => {
  return (
    <div className="modal">
      <div className="content"> {props.children}</div>
    </div>
  );
};

const portalPoint = document.getElementById("overlays");

function Modal(props) {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onClick={props.onClick}></Backdrop>,

        portalPoint
      )}

      {ReactDom.createPortal(
        <ModalOverLay>{props.children}</ModalOverLay>,

        portalPoint
      )}
    </React.Fragment>
  );
}

export default Modal;
