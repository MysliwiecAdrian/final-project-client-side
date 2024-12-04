import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";

import EditCampusView from "../views/EditCampusView";

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
    };
  }
  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
    this.state.name = this.props.campus.name;
    this.state.address = this.props.campus.address;
    this.state.description = this.props.campus.description;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let campus = {
      name: `${
        this.state.name ? this.state.name : this.props.match.params.name
      }`,
      address: `${
        this.state.address
          ? this.state.address
          : this.props.match.params.address
      }`,
      description: `${
        this.state.description
          ? this.state.description
          : this.props.match.params.description
      }`,
      id: this.props.match.params.id,
    };
    await this.props.editCampus(campus);

    // Add new student in back-end database
  };

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    return (
      <div>
        <Header />
        <EditCampusView
          campus={this.props.campus}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          editCampus={this.props.editCampus}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus, // Get the State object from Reducer "campus"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);