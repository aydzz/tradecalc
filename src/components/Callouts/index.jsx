import React from 'react'

export default function Callout(props) {
  
  return (
    <div className={"callout callout-".concat(props.variant)}>
        <h5>{props.title}</h5>
        <p>
          {props.text}
        </p>
    </div>
  )
}

Callout.defaultProps = {
  variant: "default",
  title:"Title",
  text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui est voluptate velit repellat vitae esse voluptatem quae ea dolor in asperiores hic laborum reprehenderit, adipisci aliquid nisi similique labore. Totam?"
}
