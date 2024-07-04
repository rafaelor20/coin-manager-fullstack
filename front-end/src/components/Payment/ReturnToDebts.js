import RegisterButton from './css/RegisterButton';
import Link from '../Link';

export default function Return() {
  return (
    <Link to="/listDebts">
      <RegisterButton>
        <p>Return to debts</p>
      </RegisterButton>
    </Link>
  );
}
