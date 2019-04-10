# react-hooks-practice

## What this app is about:

What I learned:

What are React Hooks?

- Allow you to create every component as a functional component since you can use state with a functional component with hooks

- Makes sharing (stateful) logic in components easier

class components become functional components
state+setState(...) becomes useState

- useState returns `currentState` and `setState` , can be named anything
  const [currentState,setState]= useState()
- useEffect
  useEffect runs after render() and whenever it rerenders
  cdm => useEffect (()=>{},[])
  `()=>{}` is whatever it executes
  cdu => useEffect(()=>{},[theVariableWatchedForUpdate])

  useEffect can return a callback function that runs when the same effect is triggered the second time for cleaning up, combined with the `[]` as
