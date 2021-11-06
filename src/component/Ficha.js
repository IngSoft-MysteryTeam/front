import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
export default function Ficha(props) {
  return (
    <div>
      <FontAwesomeIcon icon={faUserSecret} style={{color: props.color, fontSize: '30px'}} />
    </div>
  )
}