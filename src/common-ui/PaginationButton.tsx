import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './PaginationButton.module.css';

export function PaginationButton(
  props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
) {
  return <button className={styles.button} {...props} />;
}
