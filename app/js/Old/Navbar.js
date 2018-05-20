import LogoImg from "../img/train-icon.svg";
const API_KEY = "f49b5bebe4adede85ad3548e0c0c854a";
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { humidity: "", temp: "" };
    this.getWeatherData();
  }
  getWeatherData() {
    const baseURL = `http://api.openweathermap.org/data/2.5/weather?q=Melbourne&units=metric&appid=${API_KEY}`;
    const httpOptions = {
      method: "GET"
    };
    fetch(baseURL, httpOptions)
      .then(function(response) {
        return response.json();
      })
      .then(
        function(data) {
          //console.log(this);
          this.setState({
            humidity: data.main.humidity,
            temp: data.main.temp
          });
        }.bind(this)
      );
  }
  render() {
    return (
      <nav>
        <h3>Train App</h3>
        <img src={LogoImg} />
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about-us">About Us</a>
          </li>
          <li>
            <a href="#contact-us">Contact Us</a>
          </li>
          <li>
            <h4>
              Melbourne - Temp: {this.state.temp} &deg;C Humidity{" "}
              {this.state.humidity} %
            </h4>
          </li>
        </ul>
      </nav>
    );
  }
}

module.exports = Navbar;
