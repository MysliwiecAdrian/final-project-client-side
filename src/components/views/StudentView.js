/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img
        src={student.imageURL}
        alt="User Profile"
        style={{
          width: 175,
          height: 175,
          objectFit: "cover",
          borderRadius: 100,
        }}
      ></img>
      <h3>
        {student.campus ? (
          <Link to={`/campus/${student.campus.id}`}>
            <p>{student.campus.name}</p>
          </Link>
        ) : (
          "This student is not enrolled in any college."
        )}
      </h3>
      <Link to={`/student/${student.id}/edit`}>
        <button>Edit Student</button>
      </Link>
      <Link to={`/students`}>
        <button
          onClick={() => {
            deleteStudent(student.id);
          }}
        >
          Delete Student
        </button>
      </Link>
    </div>
  );
};

export default StudentView;