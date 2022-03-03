import Button from "../../components/Assets/Button";
import Icon from "../../components/Assets/Icon";
import DataTable from "../../components/Assets/DataTable";
import DataTableContainer from "../../components/Assets/DataTableContainer";
import DataTableHeader from "../../components/Assets/DataTableHeader";
import DataTableColumn from '../../components/Assets/DataTableColumn'
import PageContainer from "../../components/Assets/PageContainer";
import SearchBar from "../../components/Assets/SearchBar";
import SearchSelect from "../../components/Assets/SearchSelect";
import RemoveButton from "../../components/Assets/removeButton";
import { useState, useEffect } from 'react'

import StatusBar from '../../components/Assets/StatusBar'
import AdminFieldsPopup from "../../components/Popups/AdminFieldsPopup"

const emptyUser = () => {
    return {
        id: Date.now(),
        user: "",
        sum: "",
        date: new Date().getTime(),
        paymentMethod: "",
        status: 0
    }
}

const searchTerms = [
    {
        text: "По логину пользователя",
        value: "user"
    },
    {
        text: "По сумме",
        value: "sum"
    },
    {
        text: "По методу оплаты",
        value: "paymentMethod"
    },
]

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

const testData = [
  {
      id: 1,
      user: "userLogin",
      sum: 67200,
      date: "1641168000000",
      paymentMethod: "Payeer Wallet",
      status: 1
  },{
    id: 2,
    user: "userLogin",
    sum: 67200,
    date: "1641168000000",
    paymentMethod: "Payeer Wallet",
    status: 1
  },{
    id: 3,
    user: "userLogin",
    sum: 67200,
    date: "1641168000000",
    paymentMethod: "Payeer Wallet",
    status: 1
  },{
    id: 4,
    user: "userLogin",
    sum: 67200,
    date: "1641168000000",
    paymentMethod: "Payeer Wallet",
    status: 1
  },{
    id: 5,
    user: "userLogin",
    sum: 67200,
    date: "1641168000000",
    paymentMethod: "Payeer Wallet",
    status: 1
  },{
    id: 6,
    user: "userLogin",
    sum: 67200,
    date: "1641168000000",
    paymentMethod: "Payeer Wallet",
    status: 1
  },{
    id: 7,
    user: "userLogin",
    sum: 67200,
    date: "1641168000000",
    paymentMethod: "Payeer Wallet",
    status: 1
  },
];

const AdminHistory = () => {
    const [historyFields, setHistoryFields] = useState([])
    const [shownFields, setShownFields] = useState([])
    const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerms[0])
    const [editFieldsActive, setEditFieldsActive] = useState(false)
    const [addOrEdit, setAddOrEdit] = useState("add")
    const [editedFields, setEditedFields] = useState([])
    
    useEffect(() => {
        const getUsers = async() => {
            await setTimeout( () => { 
                setHistoryFields(testData)
                setShownFields(testData)
            }, 1000)
        }

        getUsers()
    }, [])

    function dateToString(dateInNumber, needTimeVal) {
        let date = new Date(Number(dateInNumber));
        if(needTimeVal) 
          return date.toLocaleDateString('ru-RU') + " " + date.getHours() + ":" + date.getMinutes();
        else
        return date.toLocaleDateString('ru-RU');
    }
    
    const editCLick = (editedField) => {
        setAddOrEdit("edit")
        setEditedFields(editedField)
        setEditFieldsActive(true)
    }

    const addClick = () => {
        setAddOrEdit("add")
        setEditedFields(emptyUser)
        setEditFieldsActive(true)
    }

    const dataColumnsInfo = { // Названия полей и их тип
        user: {
            placeholder: "Логин пользователя",
            type: "text",
            reqired: true
        },
        sum: {
            placeholder: "Сумма",
            type: "number",
            reqired: true
        },
        date: {
            placeholder: "Дата",
            type: "date",
            reqired: true
        },
        paymentMethod: {
            placeholder: "Метод оплаты",
            type: "text",
            reqired: true
        },
        status: {
            placeholder: "Статус",
            type: "status",
            statusMap: statusMap,
            reqired: true
      }
    }
    
    const dataColumns = [
        "Пользователь", "Сумма", "Дата", "Метод оплаты" , "Статус"
    ]

    const renderData = (v, i) => {
        return (
            <DataTableColumn key={i}>
                <td>{v.user}</td>
                <td>{v.sum}</td>
                <td>{dateToString(v.date, false)}</td>
                <td>{v.paymentMethod}</td>
                <td className="p-right-40"><StatusBar status={v.status}/></td>
                <td className="p-right-40"><Icon style={{cursor: "pointer"}} id="edit" onClick={() => editCLick(v)} /></td>
                <td className="p-right-40"><RemoveButton actionFunc={removeHistory} dataForAction={[v.id]} ><Icon style={{cursor: "pointer"}} id="delete"/></RemoveButton></td>
            </DataTableColumn>
        );
    }

    const addHistory = (newHistory) => {
        setHistoryFields([newHistory, ...historyFields]);
    }

    const editHistory = (editedHistory) => {
        historyFields.forEach((history, idx) => {
            if(history.id == editedHistory.id){
                historyFields[idx] = {...editedHistory};
            }
        });
        setHistoryFields([...historyFields]);
    }

    const removeHistory = (id) => {
        if(id != "") {
            historyFields.forEach((history, idx) => {
                if(history.id == id){
                    historyFields.splice(idx,1);
                }
            });
            setHistoryFields([...historyFields]);
        }
    }

    const onDataChange = (data) => {
        setShownFields(data);
    }

    return (
        <PageContainer>
            <DataTableContainer>
                <DataTableHeader>
                    <h1 className="a-main-menu a-main-menu-billing items-center display-flex" style={{marginRight: 20}}>История зачислений</h1>
                    <SearchBar data={historyFields} onDataChange={onDataChange} filterField={currentSearchTerm.value}/>
                    <SearchSelect searchTerms={searchTerms} currentSearchTerm={currentSearchTerm} setCurrentSearchTerm={setCurrentSearchTerm}/>
                    <Button onClick={() => addClick()} className="admin_add_button">Добавить</Button>
                </DataTableHeader>
                <DataTable emptyText="Услуги не найдены." 
                    linesLimit={6} data={shownFields} columns={dataColumns} render={renderData}/>
            </DataTableContainer>
            <AdminFieldsPopup
                active={editFieldsActive}
                setActive={setEditFieldsActive}
                header="Изменить"
                fieldsForChange={editedFields}
                fieldsForChangeInfo={dataColumnsInfo}
                edit={editHistory}
                add={addHistory}
                addOrEdit={addOrEdit}
            />
        </PageContainer>
    )
};

export default AdminHistory