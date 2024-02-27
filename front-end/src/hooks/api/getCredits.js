import useAsync from '../useAsync';
import useToken from '../useToken';
import * as creditApi from '../../services/creditApi';

export default function getCredits() {
  const token = useToken();

  const {
    loading: getCreditsLoading,
    error: getCreditsError,
    act: getCredits
  } = useAsync(() => creditApi.getCredits(token), false);

  return {
    getCreditsLoading,
    getCreditsError,
    getCredits
  };
}
