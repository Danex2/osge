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
          this.setState({ item: data.data, loading: false });
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
        </form>
        {loading ? (
          <Loading />
        ) : (
          Object.entries(item).map(val => {
            return (
              <React.Fragment key={val[1].id}>
                <h1>{val[1].name}</h1>
                <h1>{val[1].current.price}</h1>
              </React.Fragment>
            );
          })
        )}
      </div>
    );
  }
}

export default Home;
