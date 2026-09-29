// Q1. What will the counter show after one click?

// function App() {
//   const [count, setCount] = useState(0);

//   const handleClick = () => {
//     setCount(count + 1);
//     setCount(count + 1);
//     setCount(count + 1);
//   };

//   return <button onClick={handleClick}>Count: {count}</button>;
// }
// Follow up question

//////////////////////////////////////////////////////////////////

// Q2. What will be logged in the console on the first click?

// const [count, setCount] = useState(0);

// const handleClick = () => {
//   setCount(count + 1);
//   console.log(count);
// };

//////////////////////////////////////////////////////////////////

// Q3. Trace the update queue. What is the final value?

// const [count, setCount] = useState(0);

// const handleClick = () => {
//   setCount(count + 5);
//   setCount(prev => prev + 1);
// };


// Follow-up: What if the order is reversed:
// setCount(prev => prev + 1);
// setCount(count + 5);?

//////////////////////////////////////////////////////////////////

// STATES ARE IMMUTABLE

// Q4. Why does the UI not update, even though the array has changed?

// const [items, setItems] = useState([1, 2]);

// const addItem = () => {
//   items.push(3);
//   setItems(items);
// };

//////////////////////////////////////////////////////////////////

// Q5. What will the user object look like after clicking?

// const [user, setUser] = useState({ name: "Rohit", age: 30 });

// const handleClick = () => {
//   setUser({ name: "Amit" });
// };

//////////////////////////////////////////////////////////////////

// Q6. How many times will "Rendered" be logged after one click?

// function App() {
//   const [a, setA] = useState(0);
//   const [b, setB] = useState(0);
//   console.log("Rendered");

//   const handleClick = () => {
//     setA(a + 1);
//     setB(b + 1);
//   };

//   return <button onClick={handleClick}>{a} {b}</button>;
// }

//////////////////////////////////////////////////////////////////

// Q7. Why does this crash with "Too many re-renders"?

// function App() {
//   const [count, setCount] = useState(0);

//   return <button onClick={setCount(count + 1)}>Click</button>;
// }

//////////////////////////////////////////////////////////////////

// Q8. Why doesn't the UI update, though the console shows the number increasing?

// function App() {
//   let count = 0;

//   const handleClick = () => {
//     count++;
//     console.log(count);
//   };

//   return <button onClick={handleClick}>Count: {count}</button>;
// }

//////////////////////////////////////////////////////////////////

// Q9. The user clicks "Increment" 3 times, then "Hide", then "Show". What does the counter display?

// function Counter() {
//   const [count, setCount] = useState(0);
//   return <button onClick={() => setCount(count + 1)}>{count}</button>;
// }

// function App() {
//   const [show, setShow] = useState(true);
//   return (
//     <>
//       <button onClick={() => setShow(!show)}>Toggle</button>
//       {show && <Counter />}
//     </>
//   );
// }

//////////////////////////////////////////////////////////////////

// Q10. What happens when the child tries to change a prop?

// function Child(props) {
//   props.name = "Changed";
//   return <h1>{props.name}</h1>;
// }

// <Child name="Original" />

//////////////////////////////////////////////////////////////////

// Q11. Parent changes start from 0 to 10. What does the child show?

// function Child({ start }) {
//   const [count, setCount] = useState(start);
//   return <h1>{count}</h1>;
// }

// function Parent() {
//   const [start, setStart] = useState(0);
//   return (
//     <>
//       <button onClick={() => setStart(10)}>Set Start to 10</button>
//       <Child start={start} />
//     </>
//   );
// }
