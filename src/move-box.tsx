import "txiki-node-polyfill"
import { Box, Down, Left, Right, Up, onInput, render } from "@r-tui/solid"
import { createSignal } from "solid-js"

export default function App() {
  const [x, setX] = createSignal(0)
  const [y, setY] = createSignal(0)

  onInput((key) => {
    if (!key) {
      return
    }
    switch (key) {
      case "a":
      case Left: {
        setX((x) => x - 1)
        break
      }
      case Right:
      case "d": {
        setX((x) => x + 1)
        break
      }
      case Up:
      case "w": {
        setY((y) => y - 1)
        break
      }
      case Down:
      case "s": {
        setY((y) => y + 1)
        break
      }
    }
  })

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box position="absolute" left={x()} top={y()} color="red" text={"█"} />
    </Box>
  )
}
render(() => <App />, {
  fps: 30,
  write: s => {
    console.clear()
    process.stdout.write(s.trimEnd())
  }
})
