import useAsync from '../useAsync';
import useToken from '../useToken';
import * as transactionApi from '../../services/transactionApi';

export default function getTransactions() {
  const token = useToken();
  const {
    loading: getTransactionsLoading,
    error: getTransactionsError,
    act: useGetTransactions
  } = useAsync(() => transactionApi.getTransactions(token), false);

  return {
    getTransactionsLoading,
    getTransactionsError,
    useGetTransactions
  };
}
