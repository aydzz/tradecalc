import React from 'react'
import styled from 'styled-components';
import Modal from "@restart/ui/Modal"
import ExitTradeForm from './ExitTradeForm';
import CardErrorBoundary from "../../../../../components/ErrorBoundaries/CardErrorBoundary"
import { useRef } from 'react';

const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

const CustomModal = styled(Modal)`
  position: fixed;
  width: 100%;
  z-index: 1040;
  transform: translate(-50%, 0%);
  top: 0%;
  left: 50%;
`;

export default function ExitModal(props) {
    const shown = props.shown;
    const setShown = props.setShown;

    const tradeID = props.tradeID;
    const formRef = useRef();
    const renderBackdrop = (props) => <Backdrop {...props} />;
  return (
  <CustomModal
        show={shown}
        onHide={() => setShown(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
        className="modal-dialog mx-0 mt-4"
      >
       
          <div className="modal-content">
            <div className="modal-header">
              <p className={`modal-title `.concat((props.tradeID ? "text-primary" : ""))}>{props.tradeID ?? props.title}</p>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={()=>{setShown(false)}}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <CardErrorBoundary>
                <ExitTradeForm tradeID={tradeID} formRef={formRef} setModalShown={setShown}/>
              </CardErrorBoundary>
            </div>
            <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>{setShown(false)}}>Close</button>
              <button type="button" className="btn btn-primary"
                onClick={(e)=>{
                  e.preventDefault();
                  formRef.current.dispatchEvent(
                    new Event("submit", { bubbles: true, cancelable: true })
                  );
                }}
              >Confirm</button>
            </div>
        </div>
      </CustomModal>
  )
}

ExitModal.defaultProps = {
    shown: false,
    setShown: ()=>{},
    title: "Modal Title",
    tradeID: "",
}
