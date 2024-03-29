import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Question } from '../../../../../types/Question';
import styles from './BubbleSelect.module.scss';
import { Button } from '../../../../Button/Button';
import { useAppSelector } from '../../../../../store/hooks';

type Props = {
  question: Question;
  goForward: (answer: string) => void;
};

export const BubbleSelect: FC<Props> = ({ question, goForward }) => {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleCheckbox = (option: string) => {
    setSelectedOptions((currentOptions) =>
      !currentOptions.includes(option) && currentOptions.length < 3
        ? [...currentOptions, option]
        : currentOptions.filter((currentOption) => currentOption !== option),
    );
  };

  const { answers } = useAppSelector((state) => state.Answers);

  useEffect(() => {
    if (question.title === 'What are your favorite topics?') {
      const previusAnswer = answers.find(
        (a) => a.title === 'What is your age?',
      );

      if (previusAnswer) {
        switch (previusAnswer.answer) {
          case '18-29 years':
            setSelectedOptions(['Werewolf', 'Bad Boy', 'Billionaire']);
            break;

          case '30-39 years':
            setSelectedOptions(['Young Adult', 'Action']);
            break;

          case '40-49 years':
            setSelectedOptions(['Romance', 'Royal Obsession']);
            break;

          case '59+ years':
            setSelectedOptions(['Romance', 'Action']);
            break;

          default:
            setSelectedOptions([]);
        }
      }
    }
  }, [answers, question.title]);

  return (
    <div className={styles.actions__wrapper}>
      <div className={styles.select__wrapper}>
        <div className={styles.select}>
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => toggleCheckbox(option.value)}
              aria-label='toggle-checkbox'
              type='button'
              className={
                selectedOptions.includes(option.value)
                  ? styles.select__item_active
                  : styles.select__item
              }
            >
              {!!option.icon && (
                <img
                  className={styles.select__item__icon}
                  src={option.icon}
                  alt='item-icon'
                />
              )}
              <p className={styles.select__item__text}>{option.value}</p>
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={() => goForward(selectedOptions.join(', '))}
        disabled={!selectedOptions.length}
      >
        {t('button.next')}
      </Button>
    </div>
  );
};
