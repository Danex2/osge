import React from "react";
import axios from "axios";
import "../css/Home.css";
import Loading from "./Loading";

class Home extends React.Component {
  state = {
    item: [],
    search_item: "",
    loading: false
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true }, () =>
      axios
        .post("/item", {
          search_item: this.state.search_item
        })
        .then(data => {
          this.setState({ item: data.data.item, loading: true });
        })
    );
  };
  render() {
    const { item, loading } = this.state;
    return (
      <div className="container input-form d-flex justify-content-center">
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-10">
              <input
                className="form-control"
                type="text"
                name="search_item"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-2">
              <button className="btn btn-primary">Submit</button>
            </div>
            <div className="form-group col-md-6">
              <small className="text-muted form-text">
                Use the textbox to search for an item
              </small>
            </div>
          </div>
          {item.length === 0 && loading === true ? (
            <Loading />
          ) : (
            <React.Fragment>
              <img src={item.icon_large} alt="runescape item" />
              <span className="text-muted">{item.name}</span>
              <span className="text-muted">{item.current.price}</span>
            </React.Fragment>
          )}
        </form>
      </div>
    );
  }
}

export default Home;
