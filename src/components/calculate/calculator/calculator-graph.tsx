import Graphviz from "graphviz-react"

export const CalculatorGraphComponent = (props: {dot: string}) => {
  return (
    <Graphviz dot={props.dot} />
  )
}