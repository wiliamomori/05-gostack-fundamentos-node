import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type))
      throw new Error('Transaction type is not valid');

    if (type === 'outcome' && value > total) throw Error('Limit exceeded');

    const transation = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transation;
  }
}

export default CreateTransactionService;
