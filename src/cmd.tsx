import "txiki-node-polyfill"
import { Box, effect, useReadLine, render } from "@r-tui/solid"
import { spawn } from "txiki-node-polyfill"
import { createSignal } from "solid-js"

export default function App() {
  const data = useReadLine()
  const [output, setOutput] = createSignal("")

  effect(() => {
    if (!data()) {
      return
    }
    const list = data()?.split(" ") || []
    if (!list.length) {
      return
    }
    const [exe, ...args] = list
    const cmd = spawn(exe, args)
    cmd.stdout.on("data", (s) => {
      setOutput(s.toString().trim())
    })
  })

  return (
    <Box
      id="cmd-main"
      width={"100%"}
      height={"100%"}
      display="flex"
      flexDirection="row"
    >
      {!!data()?.length && (
        <Box id="cmd" color="green" text={`cmd: ${data()}`} />
      )}
      {!!output()?.length && (
        <Box id="output" color="yellow" text={`output:\n${output()}`} />
      )}
      <Box id="enter" color="red" text={"enter: "} />
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