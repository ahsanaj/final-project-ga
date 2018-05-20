const Navbar = require("./Navbar.js");
const Header = require("./Header.js");
const JourneyPlanner = require("./JourneyPlanner.js");
const Footer = require("./Footer.js");

class Combine extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Header />
        <JourneyPlanner />
        <Footer />
      </div>
    );
  }
}

module.exports = Combine;
