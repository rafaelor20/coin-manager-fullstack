import RegisterButton from './css/RegisterButton';
import Link from '../Link';

export default function Debt() {
  return (
    <Link to="/debt">
      <RegisterButton>
        <p>Register Debt</p>
      </RegisterButton>
    </Link>
  );
}

