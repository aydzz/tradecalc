import styled from "styled-components";
import {useState} from "react"
import Modal from "@restart/ui/Modal"
import Button from "@restart/ui/Button"

let rand = () => Math.floor(Math.random() * 20) - 10;

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

// we use some pseudo random coords so nested modals
// don't sit right on top of each other.
const CustomModal = styled(Modal)`
  position: fixed;
  width: 100%;
  z-index: 1040;
  margin-top: 50px;
  transform: translate(-50%, 0%);
  top: 0%;
  left: 50%;
`;

export default function ModalExample() {
  const [show, setShow] = useState(false);

  const renderBackdrop = (props) => <Backdrop {...props} />;

  return (
    <div className="modal-example">
      <Button
        className="mb-4"
        onClick={() => setShow(true)}
      >
        Open Modal
      </Button>
      <p>Click to get the full Modal experience!</p>

      <CustomModal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
        className="modal-dialog"
      >
       
          <div class="modal-content">
            <div class="modal-header">
              <p class="modal-title">Default Modal</p>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={()=>{setShow(false)}}>×</span>
              </button>
            </div>
            <div class="modal-body">
              <p>One fine body…</p>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal" onClick={()=>{setShow(false)}}>Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
     
        
        </div>
      </CustomModal>
    </div>
  );
}