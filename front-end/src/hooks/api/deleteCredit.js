import useAsync from '../useAsync';
import useToken from '../useToken';
import * as creditApi from '../../services/creditApi';

export default function deleteCredit() {
  const token = useToken();

  const {
    loading: deleteCreditLoading,
    error: deleteCreditError,
    act: deleteCredit
  } = useAsync((data) => creditApi.deleteCredit(data, token), false);

  return {
    deleteCreditLoading,
    deleteCreditError,
    deleteCredit
  };
}
