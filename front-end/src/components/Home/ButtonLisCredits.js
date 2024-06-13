import RegisterButton from './css/RegisterButton';
import Link from '../Link';

export default function ListCredits() {
  return (
    <Link to="/listCredits">
      <RegisterButton>
        <p>Show Credits</p>
      </RegisterButton>
    </Link>
  );
}
