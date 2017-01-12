/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { loginUserSuccess } from '../redux/actions';

const mapStateToProps = (state) => {
  // Pass Redux State as Container Props
  return {
    isAuthenticated: state.reducer.isAuthenticated,
    loading: state.reducer.isFetching,
    error: state.reducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(loginUserSuccess, dispatch),
  };
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      authed: props.isAuthenticated,
      user: null,
    };
    console.log(props);
  }


  componentWillMount() {
    console.log('cwm');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.authed !== this.props.authed) {
      console.log('new props!!!');
      console.log(nextProps);
      this.setState({ authed: nextProps.authed });
    }
  }

  onLogin() {
    console.log('do something in redux');
    this.props.login('ABCD1234');
  }

  render() {
    return (
      <div>
        <h1>Home!</h1>
        <Button
          content={'login'}
          onClick={this.onLogin}
        />
        <Link to="/dashboard">dashboard</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);