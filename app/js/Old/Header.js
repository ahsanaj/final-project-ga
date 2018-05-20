class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("form is submitted", this.state.value);
  }
  render() {
    return (
      <header>
        <h1>Train App</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.value}
          />
          <input type="submit" value="Search" />
        </form>
      </header>
    );
  }
}

module.exports = Header;
