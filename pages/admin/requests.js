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
        serviceId: "",
        sum: "",
        date: new Date().getTime(),
        status: 0,
        link: "",
        login: "",
        password: ""
    }
} 
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
        user: "userLogindd",
        serviceId: "#33567",
        sum: 67200,
        date: "1641168000000",
        status: 1,
        link: "",
        login: "",
        password: ""
    },{
        id: 2,
        user: "userLogin",
        serviceId: "#33567",
        sum: 67200,
        date: "1641168000000",
        status: 1,
        link: "",
        login: "",
        password: ""
    },{
        id: 3,
        user: "userLogin",
        serviceId: "#33567",
        sum: 67200,
        date: "1641168000000",
        status: 1,
        link: "",
        login: "",
        password: ""
    },
];

const searchTerms = [
    {
        text: "По логину пользователя",
        value: "user"
    },
    {
        text: "По id услуги",
        value: "serviceId"
    },
    {
        text: "По сумме",
        value: "sum"
    }
]

const AdminRequests = () => {
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
        
        if(needTimeVal) {
            const validateTime = (time) => {
                if(time < 10)
                    time = "0" + time
                return time
            }
            return date.toLocaleDateString('ru-RU') + " " + validateTime(date.getHours()) + ":" + validateTime(date.getMinutes());
        } else
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
            type: "datetime",
            reqired: true
        },
        serviceId: {
            placeholder: "Номер услуги",
            type: "text",
            reqired: true
        },
        status: {
            placeholder: "Статус",
            type: "status",
            statusMap: statusMap,
            reqired: true
        },
        link: {
            placeholder: "Ссылка на сервер",
            type: "text",
            reqired: true
        },
        login: {
            placeholder: "Логин",
            type: "text",
            reqired: true
        },
        password: {
            placeholder: "Пароль",
            type: "text",
            reqired: true
        },
        message: {
            placeholder: "Сообщение",
            type: "textarea",
        },
    }
    
    const dataColumns = [
        "Пользователь", "Сумма", "Дата", "Номер услуги" , "Статус"
    ]

    const renderData = (v, i) => {
        return (
            <DataTableColumn key={i}>
                <td>{v.user}</td>
                <td>{v.sum}</td>
                <td>{dateToString(v.date, true)}</td>
                <td>{v.serviceId}</td>
                <td className="p-right-40"><StatusBar status={v.status}/></td>
                <td className="p-right-40"><Icon style={{cursor: "pointer"}} id="edit" onClick={() => editCLick(v)} /></td>
                <td className="p-right-40"><RemoveButton actionFunc={removeHistory} dataForAction={[v.id]} ><Icon style={{cursor: "pointer"}} id="delete" /></RemoveButton></td>
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

        removeHistory(editedHistory.id) //Удаляю после успешного подтверждения
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
                    <h1 className="a-main-menu a-main-menu-billing items-center display-flex" style={{marginRight: 20}}>Заявки</h1>
                    <SearchBar data={historyFields} onDataChange={onDataChange} filterField={currentSearchTerm.value}/>
                    <SearchSelect searchTerms={searchTerms} currentSearchTerm={currentSearchTerm} setCurrentSearchTerm={setCurrentSearchTerm}/>  
                </DataTableHeader>
                <DataTable emptyText="Услуги не найдены." 
                    linesLimit={6} data={shownFields} columns={dataColumns} render={renderData}/>
            </DataTableContainer>
            <AdminFieldsPopup
                active={editFieldsActive}
                setActive={setEditFieldsActive}
                header="Подтвердить заявку"
                fieldsForChange={editedFields}
                fieldsForChangeInfo={dataColumnsInfo}
                edit={editHistory}
                add={addHistory}
                addOrEdit={addOrEdit}
            />
        </PageContainer>
    )
};

export default AdminRequests