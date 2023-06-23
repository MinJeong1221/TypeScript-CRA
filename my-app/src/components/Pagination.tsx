import cx from "clsx";
import styles from "./Pagination.module.css";

interface onClickProps{
  onClick: (page: number)=> void, 
}

interface PageButtonProps extends onClickProps{
  number: number,  
  selected: boolean,
}

function PageButton({ onClick, number, selected }: PageButtonProps) {
  return (
    <button
      type="button"
      className={cx(styles.button, { [styles.selected]: selected })}
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  );
}

interface Props extends onClickProps{
  maxPage: number, 
  currentPage : number,
}

function Pagination({
  maxPage, 
  currentPage, 
  onClick, 
}: Props) {
  return (
    <div className={styles.pagenation}>
      <button
        type="button"
        className={cx(
          styles.button /* { [styles.disabled]: currentPage === 1 }*/,
          styles.buleButton,
        )}
        disabled={currentPage === 1}
      >
        {"< Previous"}
      </button>
      {new Array(maxPage).fill(null).map((_, i) => (
        <PageButton
          key={i}
          number={i + 1}
          onClick={onClick}
          selected={i + 1 === currentPage}
        />
      ))}
      <button
      type="button"
        className={cx(
          styles.button /*{
          [styles.disabled]: currentPage === maxPage,
        }*/,
          styles.buleButton,
        )}
        disabled={currentPage === maxPage}
      >
        {`Next >`}
      </button>
    </div>
  );
}


export default Pagination;
