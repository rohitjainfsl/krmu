import { useState } from "react";

function App() {
  // innerHTML, innerText, getElementById, querySelector, addEventListener
  // State variable: whenever changed get automatically updated in the UI
  // States are immutable: you cannot change it directly

  //destructuring, closure

  // const [count, setCount] = useState(0);

  // function handleIncrement() {
  //   // count = count + 1;
  //   // count++;
  //   setCount(count + 1);
  // }
  // function handleDecrement() {
  //   // count = count - 1;
  //   // count--;
  //   if (count > 0) setCount(count - 1);
  // }

  //Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.

  // function handleClick(operation) {
  //   if (operation === "inc") {
  //     setCount(count + 1);
  //   } else {
  //     setCount(count - 1);
  //   }
  // }

  return (
    <>
      {/* <button onClick={() => handleClick("inc")}>Increment</button>
      <p>{count}</p>
      <button onClick={() => handleClick("dec")}>Decrement</button> */}

      <h2>Heading 1</h2>
      <h2>Heading 2</h2>
      <h2>Heading 3</h2>
      <h2>Heading 4</h2>

      <p></p>
    </>
  );
}
export default App;
