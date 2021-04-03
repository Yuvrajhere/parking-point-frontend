import "./Alert.css";

import Button from "../smallerComponents/Button";

import { connect } from "react-redux";
import { removeAlert } from "../../actions/index";

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

const mapDispatchToProps = {
  removeAlert: removeAlert,
};

const Alert = (props) => {
  return (
    <div className="Alert">
      <div className="alert-content">
        <p>{props.alert}</p>
        <Button
          buttonType="pri-btn"
          handleClick={() => {
            props.removeAlert();
          }}
        >
          Okay
        </Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
