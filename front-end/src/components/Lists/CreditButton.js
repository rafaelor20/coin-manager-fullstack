import RegisterButton from './css/RegisterButton';
import Link from '../Link';

export default function TestCredit() {
  return (
    <Link to="/creditPayment">
      <RegisterButton>
        <p>test credit</p>
      </RegisterButton>
    </Link>
  );
}
