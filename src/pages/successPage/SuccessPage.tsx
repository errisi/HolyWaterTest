import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import styles from './SuccessPage.module.scss';

export const SuccessPage = () => {
  const navigate = useNavigate();

  const handleRetakeQuiz = () => {
    navigate('../quiz/');
  };

  return (
    <div className={styles.success}>
      <div className={styles.success__content}>
        <div className={styles.success__content__text}>
          <h1 className={styles.success__content__text__title}>Thank you</h1>
          <p className={styles.success__content__text__hint}>
            for supporting us and passing quiz
          </p>
        </div>
        <img
          src='/success-mark.svg'
          alt='success-mark'
          className={styles.success__content__mark}
        />
      </div>

      <div className={styles.success__actions}>
        <button type='button' className={styles.success__actions__download}>
          <img src='./download-icon.svg' alt='' />
          Download my answers
        </button>
        <Button onClick={handleRetakeQuiz}>Retake quiz</Button>
      </div>
    </div>
  );
};
