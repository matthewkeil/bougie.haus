import React from "react";
import { connect } from "react-redux";

class SocialLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.attemptLogin();
  }

  attemptLogin() {
    const { social, baseUrl } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${baseUrl}/auth/login/${social}`; //?socketId=${socket.id}`

    const popup = window.open(
      url,
      "_blank",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
    );
  }

  render() {
    const { social, sprite, imgClassName, baseUrl } = this.props;
    return (
      <a href={baseUrl + "/auth/login/" + social} onClick={this.handleClick}>
        <img className={imgClassName} src={sprite} alt={social} />
      </a>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialLogin);
