/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  const { deleteCampus } = props;
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
      <div>
        <p>There are no campuses.</p>
        <Link to={`/newcampus`}>
          <button>Add New Campus</button>
        </Link>
      </div>
    );
  }

  // If there is at least one campus, render All Campuses view
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>campus id: {campus.id}</h4>
          <img
            src={campus.imageURL}
            alt="User profile"
            style={{
              width: 175,
              height: 175,
              objectFit: "cover",
              borderRadius: 100,
            }}
          ></img>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          <hr />
        </div>
      ))}
      <br />
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br />
      <br />
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;