import RegisterButton from './css/RegisterButton';
import Link from '../Link';

export default function Return() {
  return (
    <Link to="/home">
      <RegisterButton>
        <p>Return to Home page</p>
      </RegisterButton>
    </Link>
  );
}
