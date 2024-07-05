import useAsync from '../useAsync';
import useToken from '../useToken';
import * as debtApi from '../../services/debtApi';

export default function getDebtById() {
  const token = useToken();
    
  const {
    loading: getDebtByIdLoading,
    error: getDebtByIdError,
    act: useGetDebtById
  } = useAsync((id) => debtApi.getDebtById(id, token),
    false);
  return {
    getDebtByIdLoading,
    getDebtByIdError,
    useGetDebtById
  };
}
