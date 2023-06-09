import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonInput);
  };

  handleSubmit = (event) => {
    const { email } = this.state;
    event.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  buttonInput = () => {
    const { password, email } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const number = 6;
    if (password.length < number || !emailRegex.test(email)) {
      this.setState({ buttonDisabled: true });
    } else {
      this.setState({ buttonDisabled: false });
    }
  };

  render() {
    const { buttonDisabled, email, password } = this.state;
    return (
      <div>
        <form
          className="login-page"
          onSubmit={ this.handleSubmit }
        >
          <label htmlFor="email-input" className="email-input">
            Email:
            <input
              type="text"
              onChange={ this.handleChange }
              name="email"
              data-testid="email-input"
              className="email-input"
              placeholder="Insira seu e-mail"
              value={ email }
              required
            />
          </label>
          <br />
          <label htmlFor="password-input" className="password-input">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              minLength="6"
              className="password-input"
              placeholder="Insira sua senha"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              required
            />
          </label>
          <br />
          <button
            type="submit"
            disabled={ buttonDisabled }
            className="button-login"
            onClick={ this.handleSubmit }
          >
            <strong>Entrar</strong>
          </button>
        </form>
      </div>
    );
  }
}
export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
