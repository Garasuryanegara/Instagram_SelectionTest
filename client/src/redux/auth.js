const init = {
  fullname: "",
  username: "",
  biodata: "",
  email: "",
  img_url: "",
  verification: "",
};

function userReducer(state = init, action) {
  //action adalah event yang terjadi
  if (action.type == "login") {
    return {
      ...state,
      id: action.payload.id,
      fullname: action.payload.fullname,
      username: action.payload.username,
      biodata: action.payload.biodata,
      email: action.payload.email,
      img_url: action.payload.img_url,
      verification: action.payload.verification,
    };
  } else if (action.type == "logout") {
    return init;
  }
  // console.log(state);
  return state;
}

export default userReducer;
