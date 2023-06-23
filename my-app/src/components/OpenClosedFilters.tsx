import cx from "clsx";
import styles from "./OpenClosedFilters.module.css";

interface Props{ 
  state: string, 
  onClick: (e:React.MouseEvent<HTMLSpanElement>)=> void, 
  selected: boolean,
}

function OpenClosedFilter({
  state, 
  onClick, 
  selected,
}: Props) {
  return (
    <span
      role="button"
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {state}
    </span>
  );
}

interface OCProps{
  isOpenMode: boolean,
  onClickMode: (v: string) => void,
}

function OpenClosedFilters({
  isOpenMode,
  onClickMode,
}: OCProps) {
  return (
    <>
      <OpenClosedFilter
        state={"Open"}
        selected={isOpenMode}
        onClick={() => onClickMode("open")}
      />
      <OpenClosedFilter
        state={"Closed"}
        selected={!isOpenMode}
        onClick={() => onClickMode("closed")}
      />
    </>
  );
}


export default OpenClosedFilters;
