import styles from './ListItem.module.css';
import ListItemLayout from "./ListItemLayout";
import Badge from "./Badge";
import moment from "moment";
import { ListItemType } from '../modal/issues';

interface Props{
  checked: boolean,
  onClickTitle ?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  data:ListItemType,
  onChangeCheckBox: (e: React.ChangeEvent<HTMLInputElement>)=> void,
}


export default function ListItem({
  checked,
  onChangeCheckBox,
  onClickTitle,
  data,
}:Props) {
  const badges = data.labels;
  const state = data.state === "open" ? "opened" : "closed";
  const date = data.state === "open" ? data.created_at : data.closed_at;

  return (
    <ListItemLayout checked={checked} onClick={onChangeCheckBox}>
      <div>
        <div role="button" className={styles.title} onClick={onClickTitle}>
          {data.title}
          {badges.length > 0
            && badges.map((props)=> <Badge {...props} key={`${props.name}`} />)}
        </div>
        <div className={styles.description}>
          #{data.number}
          {' '}
          {state}
          {' '}
          {moment(date).fromNow()}
          {' '}
          by
          {' '}
          {data.user.login}
        </div>
      </div>
    </ListItemLayout>
  );
}
