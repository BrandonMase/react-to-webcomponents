export const App = (props: any) => {
  console.log('these are the props', props);

  return (<div data-check="true">{props.children}</div>)
}

