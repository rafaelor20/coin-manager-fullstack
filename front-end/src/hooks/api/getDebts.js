import useAsync from '../useAsync';
import useToken from '../useToken';
import * as debtsApi from '../../services/debtApi';

export default function getDebts() {
  const token = useToken();

  const {
    loading: getDebtsLoading,
    error: getDebtsError,
    act: useGetDebts
  } = useAsync(() => debtsApi.getDebts(token), false);

  return {
    getDebtsLoading,
    getDebtsError,
    useGetDebts
  };
}
