import useAsync from '../useAsync';
import useToken from '../useToken';
import * as transactionApi from '../../services/transactionApi';

export default function saveTransactions() {
  const token = useToken();

  const {
    loading: saveTransactionLoading,
    error: saveTransactionError,
    act: saveTransaction
  } = useAsync((data) => transactionApi.storeTransaction(data, token), false);

  return {
    saveTransactionLoading,
    saveTransactionError,
    saveTransaction
  };
}
