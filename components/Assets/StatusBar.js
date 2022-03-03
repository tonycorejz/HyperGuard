const statusMap = [
    {
        prefix: "unknown",
        text: "Неизвестно"
    },
    {
        prefix: "blue",
        text: "Активен"
    },{
        prefix: "green",
        text: "Подтвержден"
    },{
        prefix: "orange",
        text: "Заморожен"
    },{
        prefix: "red",
        text: "Отклонен"
    },
]

function isInt(value) {
    if (isNaN(value))
      return false;
    let x = parseFloat(value);
    return (x | 0) === x;
}

function validateStatus(status, statusArray) {
    if(isInt(status) && statusArray[status]){
        return statusArray[status]
    }
    
    return statusArray[0]
}

const BarRender = ({currentStatus, currentChildren, className}) => {
    return (
      <label className={`status display-flex status-${currentStatus.prefix} ${className}`}>
          {currentChildren || currentStatus.text}
      </label>
    );
}
  
const StatusBar = (props) => {
    const obj =  validateStatus(props.status, props.map || statusMap)
    return (
      <BarRender currentStatus={obj} currentChildren={props.children} className={props.className}/>
    );
};

export default StatusBar;