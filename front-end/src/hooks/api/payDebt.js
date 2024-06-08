import useAsync from '../useAsync';
import useToken from '../useToken';
import * as debtApi from '../../services/debtApi';

export default function payDebt() {
  const token = useToken();

  const {
    loading: payDebtLoading,
    error: payDebtError,
    act: payDebt
  } = useAsync((data) => debtApi.payDebt(data, token), false);

  return {
    payDebtLoading,
    payDebtError,
    payDebt
  };
}
