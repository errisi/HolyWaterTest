import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Question } from '../../../../../types/Question';
import styles from './MultipleSelect.module.scss';
import { Button } from '../../../../Button/Button';

type Props = {
  question: Question;
  goForward: (answer: string) => void;
};

export const MultipleSelect: FC<Props> = ({ question, goForward }) => {
  const { t } = useTranslation();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleCheckbox = (option: string) => {
    setSelectedOptions((currentOptions) =>
      currentOptions.includes(option)
        ? currentOptions.filter((currentOption) => currentOption !== option)
        : [...currentOptions, option],
    );
  };

  return (
    <div className={styles.actions__wrapper}>
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
            <div className={styles.select__item__content}>
              <p className={styles.select__item__content__text}>
                {option.value}
              </p>
              <div
                className={
                  selectedOptions.includes(option.value)
                    ? styles.select__item__content__checkbox_checked
                    : styles.select__item__content__checkbox
                }
              >
                <div
                  className={
                    styles.select__item__content__checkbox_checked__mark
                  }
                />
              </div>
            </div>
          </button>
        ))}
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
