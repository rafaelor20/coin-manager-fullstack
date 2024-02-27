import useAsync from '../useAsync';
import useToken from '../useToken';
import * as creditApi from '../../services/creditApi';

export default function saveCredit() {
  const token = useToken();

  const {
    loading: saveCreditLoading,
    error: saveCreditError,
    act: saveCredit
  } = useAsync((data) => creditApi.storeCredit(data, token), false);

  return {
    saveCreditLoading,
    saveCreditError,
    saveCredit
  };
}
