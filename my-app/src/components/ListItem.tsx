import styles from './ListItem.module.css';
// import ListItemLayout from "./ListItemLayout";
// import Badge from "./Badge";
import moment from "moment";

interface Props{
  checked: boolean,
  // onChangeCheckBox:,
  onClickTitle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  data:{
    labels: string,
    state: string,
    number :number,
    title : string,
    created_at : string,
    closed_at :string,
    user: {
      login : string
   },
  }
}

export default function ListItem({
  checked,
  // onChangeCheckBox,
  onClickTitle,
  data,
}:Props) {
  const badges = data.labels;
  const state = data.state === "open" ? "opened" : "closed";
  const date = data.state === "open" ? data.created_at : data.closed_at;

  return (
    // <ListItemLayout checked={checked} onClick={onChangeCheckBox}>
      <div>
        <div role="button" className={styles.title} onClick={onClickTitle}>
          {data.title}
          {/* {data.labels.length > 0 &&
            badges.map((badgeProps, idx) => (
              <Badge key={idx} {...badgeProps} />
            ))} */}
        </div>
        <div className={styles.description}>
          #{data.number} {state} {moment(date).fromNow()} by {data.user.login}
        </div>
      </div>
    // </ListItemLayout>
  );
}
