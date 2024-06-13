import RegisterButton from './css/RegisterButton';
import Link from '../Link';

export default function ListDebts() {
  return (
    <Link to="/listDebts">
      <RegisterButton>
        <p>Show Debts</p>
      </RegisterButton>
    </Link>
  );
}
