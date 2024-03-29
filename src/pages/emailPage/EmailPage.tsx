import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './EmailPage.module.scss';
import { Button } from '../../components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as AnswersActions from '../../store/reducers/Answers';

export const EmailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { answers } = useAppSelector((state) => state.Answers);

  const [email, setEmail] = useState('');
  const [emailDitry, setEmailDitry] = useState(false);
  const [emailError, setEmailError] = useState(t('email.error-empty'));

  const formatAgreementWithSpan = (text: string, className: string) => {
    return text.replace(
      /\b(Privacy policy|Terms of use)\b/gi,
      `<span class="${className}">$1</span>`,
    );
  };

  const formattedAgreement = formatAgreementWithSpan(
    t('email.agreement'),
    styles.email_page__content__agreement_span,
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const re = new RegExp(
      `^(([^<>()[\\]\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$`,
      'i',
    );

    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError(t('email.error-incorrect'));
    } else {
      setEmailError('');
    }
  };

  const onEmailBlur = () => {
    setEmailDitry(true);
  };

  const goForward = () => {
    dispatch(
      AnswersActions.set([
        ...answers,
        {
          title: 'Email',
          type: 'email',
          answer: email,
        },
      ]),
    );

    navigate('../success');
  };

  return (
    <div className={styles.email_page}>
      <div className={styles.email_page__content}>
        <div className={styles.email_page__content__text}>
          <h1 className={styles.email_page__content__text__title}>
            {t('email.title')}
          </h1>
          <p className={styles.email_page__content__text__hint}>
            {t('email.hint')}
          </p>
        </div>

        <div className={styles.input__wrapper}>
          <input
            value={email}
            onBlur={onEmailBlur}
            onChange={handleQueryChange}
            className={styles.input}
            placeholder={t('email.placeholder')}
          />
          {emailDitry && emailError && (
            <p className={styles.input__error}>{emailError}</p>
          )}
        </div>

        <p
          className={styles.email_page__content__agreement}
          dangerouslySetInnerHTML={{ __html: formattedAgreement }}
        />
      </div>

      <Button onClick={goForward} disabled={!!emailError.length}>
        {t('button.next')}
      </Button>
    </div>
  );
};
