import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editStudentThunk, fetchStudentThunk } from "../../store/thunks";
import EditStudentView from "../views/EditStudentView";

const hasNumber = /\d/;
const defaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png";

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null,
      redirect: false,
      redirectId: null,
    };
  }

  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeNames = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (hasNumber.test(event.target.value) === true) {
      alert("Names must not contain numbers");
      event.target.value = event.target.value.slice(0, -1);
    }
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.
    if (
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.email === "" ||
      this.state.email === undefined
    ) {
      alert("You have not filled in all required inputs.");
      return;
    }
    if (!this.state.email.includes("@")) {
      alert("Email addresses must contain an @");
      return;
    }

    let student = {
      firstname: `${
        this.state.firstname
          ? this.state.firstname
          : this.props.match.params.firstname
      }`,
      lastname: `${
        this.state.lastname
          ? this.state.lastname
          : this.props.match.params.lastname
      }`,
      campusId: `${
        this.state.campusId
          ? this.state.campusId
          : this.props.match.params.campusId
      }`,
      email: `${
        this.state.email ? this.state.email : this.props.match.params.email
      }`,
      imageURL: `${
        this.state.imageUrl === "" ? defaultImg : this.state.imageUrl
      }`,
      gpa: `${this.state.gpa ? this.state.gpa : this.props.match.params.gpa}`,
      id: this.props.match.params.id,
    };

    // Add new student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the new student
  };
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
    this.state.firstname = this.props.student.firstname;
    this.state.lastname = this.props.student.lastname;
    this.state.campusId = this.props.student.campusId;
    this.state.email = this.props.student.email;
    this.state.imageURL = this.props.student.imageURL;
    this.state.gpa = this.props.student.gpa;
  }
  // Unmount when the component is being removed from the DOM:

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if (this.state.redirect) {
      return <Redirect to={`/students`} />;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView
          student={this.props.student}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleChangeNames={this.handleChangeNames}
          editStudent={this.props.editStudent}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student, // Get the State object from Reducer "campus"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (campus) => dispatch(editStudentThunk(campus)),
  };
};
export default connect(mapState, mapDispatch)(EditStudentContainer);