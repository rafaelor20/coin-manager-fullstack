import RegisterButton from './css/RegisterButton';
import Link from '../Link';

export default function Return() {
  return (
    <Link to="/ListCredits">
      <RegisterButton>
        <p>Return to Credits</p>
      </RegisterButton>
    </Link>
  );
}
