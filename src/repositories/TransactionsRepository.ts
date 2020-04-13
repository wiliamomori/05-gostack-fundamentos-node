import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): BalanceDTO {
    const income = this.transactions.reduce(
      (total: number, { type, value }: Transaction) => {
        if (type === 'income') return total + value;
        return total;
      },
      0,
    );

    const outcome = this.transactions.reduce(
      (total: number, { type, value }: Transaction) => {
        if (type === 'outcome') return total + value;
        return total;
      },
      0,
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
