import useAsync from '../useAsync';
import useToken from '../useToken';
import * as debtsApi from '../../services/debtApi';

export default function saveDebt() {
  const token = useToken();

  const {
    loading: saveDebtLoading,
    error: saveDebtError,
    act: saveDebt
  } = useAsync((data) => debtsApi.storeDebt(data, token), false);

  return {
    saveDebtLoading,
    saveDebtError,
    saveDebt
  };
}
