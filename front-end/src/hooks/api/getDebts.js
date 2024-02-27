import useAsync from '../useAsync';
import useToken from '../useToken';
import * as debtsApi from '../../services/debtApi';

export default function getDebts() {
  const token = useToken();

  const {
    loading: getDebtsLoading,
    error: getDebtsError,
    act: getDebts
  } = useAsync(() => debtsApi.getDebts(token), false);

  return {
    getDebtsLoading,
    getDebtsError,
    getDebts
  };
}
