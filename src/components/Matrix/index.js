import React, {useState} from "react"
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './style.scss'

function Matrix() {
  const [line, setLine] = useState([[1, 0, 0, 0]])

  const handleLeft = () => setLine([[1, 0, 0, 0]])
  const handleRight = () => setLine([[0, 0, 0, 1]])

  return (
    <div>
      <button onClick={handleLeft}>Left</button>
      <button onClick={handleRight}>Right</button>
      <section>
        <TransitionGroup className="todo-list">
          {line.map((item, key) => <CSSTransition
            key={item}
            timeout={100}
            classNames="item"
          >
            <span key={key}>{item}</span>
          </CSSTransition>)}
        </TransitionGroup>
      </section>
    </div>
  )
}

export default Matrix

