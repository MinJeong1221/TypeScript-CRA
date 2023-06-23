import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

import styles from "./ListContainer.module.css";

import Button from "../components/Button";
import ListItem from "../components/ListItem";
import ListItemLayout from "../components/ListItemLayout";
import ListFilter from "../components/ListFilter";
import Pagination from "../components/Pagination";
import OpenClosedFilters from "../components/OpenClosedFilters";
import { GITHUB_API } from "../api";
import { ListItemType } from "../modal/issues";

function ListContainer() {
  const [inputValue, setInputValue] = useState("is:pr id:open");
  const [checked, setChecked] = useState(false);
  const [list, setList] = useState<ListItemType[]>([]); //data
  // const [page, setPage] = useState(1);
  // const [isOpenMode, setIsOpenMode] = useState(true);
  // const [params, setParams] = useState();
  const maxPage = 10;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? '1', 10);
  const state = searchParams.get("state");

  async function getData(params: URLSearchParams) {
    const data = await axios.get(`${GITHUB_API}/repos/facebook/react/issues`, {
      params,
    });
    setList(data.data);
  }

  useEffect(() => {
    getData(searchParams);
  }, [searchParams]);

  // console.log({ list });

  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.topSection}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Link to="/new" className={styles.link}>
            <Button style={{
              fontSize:'14px',
              backgroundColor: 'green',
              color: 'white',
            }}>New Issue</Button>
          </Link>
        </div>
        <OpenClosedFilters
          isOpenMode={state !== "closed"}
          onClickMode={(state) => setSearchParams({ state })}
        />
        <ListItemLayout
          className={styles.listFilter}
          style={{
            background: "rgb(246, 248, 250)",
            padding: "16px",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            marginTop: "20px",
          }}
        >
          <ListFilter
            onChangeFliter={(params) => {
              //필터링된 요소에 맞게 데이터를 불러오기
              //const data = getData('필터링된 정보')
              //setList(data);
              setSearchParams(params);
            }}
          />
        </ListItemLayout>
        <div className={styles.itemContainer}>
          {list.map((item) => (
            <ListItem
              key={item.id}
              data={item}
              checked={checked}
              onChangeCheckBox={() => setChecked((c) => !c)}
            />
          ))}
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          maxPage={maxPage}
          currentPage={page}
          onClick={(pagenumber) =>
            setSearchParams({ page: pagenumber.toString() })
          }
        />
      </div>
    </>
  );
}

export default ListContainer;
