const JourneyDetails = require("./JourneyDetails.js");
class JourneyPlanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section id="journey-planner">
        <div className="container">
          <div className="journey-planner-form">
            <form>
              <h3>Journey Planner </h3>
              <label>From</label>
              <input type="text" placeholder="Enter from station" />
              <label>To</label>
              <input type="text" placeholder="Enter destination station" />
              <input type="submit" value="Go" />
            </form>
          </div>
          <JourneyDetails />
        </div>
      </section>
    );
  }
}

module.exports = JourneyPlanner;
