import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function CustomDropdown(props) {
  return (
    <div>
    <Dropdown as={ButtonGroup}>
      <Button variant="success">{props.name}</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        {
          props.options ? props.options.map((item)=>{
            return(
              <Dropdown.Item href="#/action-1">{item}</Dropdown.Item>
            )
          }): ""
        }
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item> */}
        {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item> */}
        {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
    </div>
  );
}

export default CustomDropdown;