import React from 'react';
import { connect } from 'react-redux';
import { takingCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { userEmail, currents } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">{ userEmail }</span>
          <div>
            <span data-testid="total-field">0</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <main>
          <form>
            <input name="value" data-testid="value-input" />
            <input name="description" data-testid="description-input" />
            <label htmlFor="currency">
              Moeda
              <select id="currency" data-testid="currency-input">
                {currents.map((element) => (
                  <option key={ element }>{ element }</option>
                ))}
              </select>
            </label>
            <select data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
            <select data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </form>
        </main>
      </div>);
  }
}

const mapStateToProps = (store) => ({
  userEmail: store.user.email,
  currents: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(takingCurrencies()),
});

Wallet.propTypes = {
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
