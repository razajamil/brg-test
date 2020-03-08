import React from 'react'
import { isFunction } from '../../helpers'

const PageCounter = ({
  page,
  counterWidth,
  min,
  max,
  onNextClick,
  onPrevClick,
  onPageClick
}) => {
  const createCounter = () => {
    let elements = []

    const page_int = parseInt(page)
    const min_int = parseInt(min)
    const max_int = parseInt(max)
    const counterWidth_int = parseInt(counterWidth)

    let counter_min = page_int - counterWidth_int
    if (counter_min < min_int) counter_min = min_int

    let counter_max = page_int + counterWidth_int
    if (counter_max > max_int) counter_max = max_int

    for (let i = counter_min; i <= counter_max; i++) {
      elements.push([
        <span
          key={i}
          style={{
            color: i == page_int ? 'red' : 'black'
          }}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </span>
      ])
    }

    return elements
  }

  const handlePageClick = page => {
    onPageClick(page)
  }

  return (
    <div>
      {isFunction(onPrevClick) && (
        <button onClick={onPrevClick}>Previous</button>
      )}
      {createCounter()}
      {isFunction(onNextClick) && <button onClick={onNextClick}>Next</button>}
    </div>
  )
}

export default PageCounter
