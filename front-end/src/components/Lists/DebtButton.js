import RegisterButton from './css/RegisterButton';
import Link from '../Link';

export default function TestDebt() {
  return (
    <Link to="/debtPayment">
      <RegisterButton>
        <p>test debt</p>
      </RegisterButton>
    </Link>
  );
}
