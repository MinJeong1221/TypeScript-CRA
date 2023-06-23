import { useEffect, useState } from "react";
import styles from "./ListFilter.module.css";
import Modal from "./Modal";
import { Data, List  } from "../modal/issues";
import axios from "axios";
import { GITHUB_API } from "../api";

interface ItemProps{
  children: string,
  placeholder ?: string,
  searchDataList: List[],
  showModal : boolean,
  onClick: () => void,
  onClose: () => void,
  onChangeFliter: (value: Record<string,string>) => void,
}

function ListFilterItem({
  children,
  placeholder,
  searchDataList,
  showModal,
  onClick,
  onClose,
  onChangeFliter,
}: ItemProps) {
  // const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState(searchDataList);

  useEffect(() => {
    setList(searchDataList);
  }, [searchDataList]);

  return (
    <div className={styles.filterItem}>
      <span role="button" onClick={onClick}>
        {children}
        {' '}
        ▼
      </span>
      <div className={styles.modalContainer}>
        <Modal
          title={children}
          opened={showModal}
          onClose={onClose}
          placeholder={placeholder}
          searchDataList={list}
          onClickCell={(params) => {
            // 클릭된 정보를 통해 리스트 필터링
            onChangeFliter(params);
            // console.log(params);
          }}
        />
      </div>
    </div>
  );
}



function ListFilter({ onChangeFliter }:{
  onChangeFliter: (value: Record<string, string>)=> void
}) {
  const [showModal, setShowModal] = useState<string>();
  const [list, setList] = useState<List[]>([]);
  const filterList = ["Label", "Milestone", "Assignee"];

  async function getData(apiPath: string) {
    const data : Data= await axios.get(
      `${GITHUB_API}/repos/facebook/react/${apiPath}`,
    );
    let result = [];
    switch (apiPath) {
      case "assignees":
        result = data.data.map((d) => ({
          name: d.login,
        }));
        break;
      case "milestones":
        result = data.data.map((d) => ({
          name: d.title,
        }));
        break;
      case "labels":
      default:
        result = data.data.map((d)=>({
          ...d,
          name: '',
        }));
    }
    //{login, title,, name}
    setList(result);
  }

  useEffect(() => {
    if (showModal) {
      const apiPath = `${showModal.toLowerCase()}s`;
      getData(apiPath);
    }
  }, [showModal]);

  return (
    <>
      <div className={styles.filterLists}>
        {filterList.map((filter) => (
          <ListFilterItem
            searchDataList={list}
            key={filter}
            onClick={() => setShowModal(filter)}
            onClose={() => setShowModal(undefined)}
            showModal={showModal === filter}
            onChangeFliter={onChangeFliter}
          >
            {filter}
          </ListFilterItem>
        ))}
      </div>
    </>
  );
}


export default ListFilter;
