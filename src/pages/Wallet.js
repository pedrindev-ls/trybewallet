import React from 'react';
import { connect } from 'react-redux';
import { addSpent, takingCurrencies } from '../actions';
import { exchangeApi } from '../Services/requests';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      totalValue: 0,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleVerification);
  }

  handleClick = async () => {
    const { addExpenses, expenses } = this.props;
    const exchangeRates = await exchangeApi();
    const id = expenses.length;
    const { value, description, currency, method, tag, totalValue } = this.state;
    const currentCurrency = exchangeRates[currency].ask;
    const currentValue = value * currentCurrency;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    addExpenses(expense);
    const THREE = 3;
    const LESSONE = -1;
    this.setState({
      value: 0,
      description: '',
      totalValue: ((+totalValue + currentValue).toFixed(THREE).slice(0, LESSONE)),
    });
  }

  render() {
    const { userEmail, currents } = this.props;
    const { value, description, totalValue } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">{ userEmail }</span>
          <div>
            <span data-testid="total-field">{ totalValue }</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <form>
          <label htmlFor="value">
            Valor
            <input
              id="value"
              name="value"
              data-testid="value-input"
              type="number"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              id="description"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currents.map((element) => (
                <option key={ element }>{ element }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Metodo de Pagamento
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Motivo
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentacao">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saude">Saúde</option>
            </select>
          </label>
        </form>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </div>);
  }
}

const mapStateToProps = (store) => ({
  userEmail: store.user.email,
  currents: store.wallet.currencies,
  expenses: store.wallet.expenses,
  state: store.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(takingCurrencies()),
  addExpenses: (expense) => dispatch(addSpent(expense)),
});

Wallet.propTypes = {
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
