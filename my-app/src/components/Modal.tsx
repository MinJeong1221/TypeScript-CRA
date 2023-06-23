import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import cx from "clsx";
import { List } from "../modal/issues";

interface Props{
  opened: boolean,
  title: string,
  onClose: (e: React.MouseEvent<HTMLButtonElement>)=> void,
  placeholder ?: string,
  searchDataList: List[],
  onClickCell: (value:Record<string, string>)=> void,
}

function Modal({
  opened,
  title,
  onClose,
  placeholder,
  searchDataList,
  onClickCell,
}: Props) {
  const [filteredData, setFilteredData] = useState(searchDataList);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setFilteredData(searchDataList);
  }, [searchDataList]);

  useEffect(() => {
    if (searchValue === "") {
      setFilteredData(searchDataList);
    } else {
      const filterSearchList = searchDataList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredData(filterSearchList);
    }
  }, [searchDataList, searchValue]);

  return (
    <div className={cx(styles.modal, { [styles.opened]: opened })}>
      <div className={styles.header}>
        <span>Filter by {title}</span>
        <button type="button" onClick={onClose}>X</button>
      </div>
      <div className={styles.input}>
        <input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className={styles.list}>
        {filteredData.map((data) => (
          <div
            role="button"
            onClick={() => {
              const isLabel = title.toLowerCase() === "label";
              const paramKey = isLabel ? "labels" : title.toLowerCase();
              onClickCell({ [paramKey]: data.name });             ;
            }}
            key={data.name}
            className={styles.item}
          >
            {data.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modal;