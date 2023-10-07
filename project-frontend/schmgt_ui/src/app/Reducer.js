import {
  GET_STUDENT,
  GET_STUDENTS,
  DELETE_STUDENT,
  CREATE_STUDENT,
  GET_STAFF,
  GET_STAFFS,
  UPDATE_STAFF,
  CREATE_STAFF,
} from "./ActionType";

const initialstate = {
  students: [],
  student: {},
  errorMessage: " ",
};

function Reducer(state = initialstate, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case GET_STUDENT:
      return {
        ...state,
        errorMessage: "",
        student: action.payload,
      };
    case CREATE_STUDENT:
      return {
        ...state,
        errorMessage: "",
        student: action.payload,
      };
    case DELETE_STUDENT:
      return {
        ...state,
        errorMessage: "",
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };
    case GET_STAFFS:
      return {
        ...state,
        staffs: action.payload,
      };
    case GET_STAFF:
      return {
        ...state,
        errorMessage: "",
        staff: action.payload,
      };
    case CREATE_STAFF:
      return {
        ...state,
        errorMessage: "",
        staff: action.payload,
      };
    default:
      return state;
  }
}

export default Reducer;
