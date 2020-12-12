import './App.css';

function bgGradient() {
  fetch('https://raw.githubusercontent.com/itmeo/webgradients/master/gradients-parsed.json')
    .then(response => response.json())
    .then(data => {
      const swatch = data[Math.floor(Math.random()*data.length)]
      const deg = swatch.deg
      let gradient = ""
      for (const stop of swatch.gradient){
        gradient += stop.color + " " + stop.pos + "%, "
      }
      gradient = gradient.substring(0, gradient.length-2)
      const val = 'linear-gradient('+deg+'deg, '+ gradient+')'
      console.log(val)
    })
}

bgGradient() //get the value out of the function

let AppStyle = {
//   backgroundImage: bgGradient()
}

function App() {
  return (
    <div className="App" style={AppStyle}>
      insert app here
    </div>
  );
}

export default App;
