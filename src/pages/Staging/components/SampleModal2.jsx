import Modal from "@restart/ui/Modal"
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

// const Fade = ({ in: inProp }) => (
//   <Transition in={inProp} timeout={duration}>
//     {state => (
//       <div style={{
//         ...defaultStyle,
//         ...transitionStyles[state]
//       }}>
//         I'm a fade Transition!
//       </div>
//     )}
//   </Transition>
// )

const Fade = ({ children, ...props }) => (
  <Transition {...props} timeout={FADE_DURATION}>
    {(status, innerProps) =>
      React.cloneElement(children, {
        ...innerProps,
        className: `fade ${fadeStyles[status]} ${children.props.className}`,
      })
    }
  </Transition>
);

function TransitionExample() {
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipRef, attachRef] = useState(null);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className="btn btn-primary mr-3"
        onClick={() => setShowModal((prev) => !prev)}
      >
        Show Animated Modal
      </button>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowTooltip((prev) => !prev)}
        ref={attachRef}
      >
        Show Tooltip
      </button>

      <Overlay
        placement="top"
        transition={Fade}
        show={showTooltip}
        target={tooltipRef}
        popperConfig={{
          modifiers: [
            {
              name: "offset",
              enabled: true,
              options: { offset: [0, 10] },
            },
          ],
        }}
      >
        {({ props: { ref, style } }) => (
          <div
            ref={ref}
            className="bg-primary-200 shadow rounded z-10 px-4"
            style={style}
          >
            Hello there
          </div>
        )}
      </Overlay>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        transition={Fade}
        backdropTransition={Fade}
        renderBackdrop={(props) => (
          <div
            {...props}
            className="backdrop absolute inset-0 bg-black z-40"
          />
        )}
        renderDialog={(props) => (
          <div
            {...props}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="dialog bg-white shadow rounded-lg pointer-events-auto">
              <h4 id="modal-label">I&apos;m fading in!</h4>
              <p>
                Anim pariatur cliche reprehenderit, enim
                eiusmod high life accusamus terry richardson
                ad squid. Nihil anim keffiyeh helvetica,
                craft beer labore wes anderson cred nesciunt
                sapiente ea proident.
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}