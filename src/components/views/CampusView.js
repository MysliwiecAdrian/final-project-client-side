/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus, deleteStudent } = props;
  const history = useHistory();

  const routeChange = () => {
    let path = `/campuses`;
    history.push(path);
  };

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img
        src={campus.imageURL}
        alt="Campus building"
        style={{
          width: 175,
          height: 175,
          objectFit: "cover",
          borderRadius: 100,
        }}
      ></img>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`/campus/${campus.id}/edit`}>
        <button>Edit Campus</button>
      </Link>

      <button
        onClick={() => {
          deleteCampus(campus.id);
          routeChange();
        }}
      >
        Delete
      </button>
      {campus.students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <hr></hr>
            <h2>Students</h2>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <button
              onClick={() => {
                deleteStudent(campus.id, student.id);
              }}
            >
              Remove Student
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;