import useAsync from '../useAsync';
import useToken from '../useToken';
import * as creditApi from '../../services/creditApi';

export default function getCreditById() {
  const token = useToken();
    
  const {
    loading: getCreditByIdLoading,
    error: getCreditByIdError,
    act: useGetCreditById
  } = useAsync((id) => creditApi.getCreditById(id, token),
    false);
  return {
    getCreditByIdLoading,
    getCreditByIdError,
    useGetCreditById
  };
}
