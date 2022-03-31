import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      password: '',
      email: '',
      button: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleVerification);
  }

  handleVerification = () => {
    const { password, email } = this.state;
    const passLimit = 6;
    const emailVerifier = /\S+@\S+\.\S+/;
    const vEmail = emailVerifier.test(email);
    const vPass = password.length >= passLimit;
    if (vPass && vEmail) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  handleClick = () => {
    const { history, userEmail } = this.props;
    const { email } = this.state;

    userEmail(email);
    history.push('/carteira');
  }

  render() {
    const { password, email, button } = this.state;
    return (
      <div>
        <form>
          <input
            name="email"
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            name="password"
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </form>
        <button
          type="submit"
          onClick={ this.handleClick }
          disabled={ button }
        >
          Entrar

        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
