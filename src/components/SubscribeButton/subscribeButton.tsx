import { useSession, signIn } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session } = useSession();

  const handleSubscribe = () => {
    if (!session) {
      signIn('github');
      return;
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}
    >
      Subscribe Now
    </button>
  );
};

export default SubscribeButton;
