import useAsync from '../useAsync';
import useToken from '../useToken';
import * as creditApi from '../../services/creditApi';

export default function payCredit() {
  const token = useToken();

  const {
    loading: payCreditLoading,
    error: payCreditError,
    act: payCredit
  } = useAsync((data) => creditApi.payCredit(data, token), false);

  return {
    payCreditLoading,
    payCreditError,
    payCredit
  };
}
