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
        topic: "",
        message: "",
        status: 0,
        date: new Date().getTime()
    }
}

const searchTerms = [
    {
        text: "По логину пользователя",
        value: "user"
    },
    {
        text: "По теме",
        value: "topic"
    },
    {
        text: "По сообщению",
        value: "message"
    },
]

const statusMap = [
    {
        prefix: "unknown",
        text: "Неизвестно"
    },
    {
        prefix: "blue",
        text: "Открыт"
    },{
        prefix: "green",
        text: "Отвечен"
    },{
        prefix: "red",
        text: "Закрыт"
    },
]

const testData = [
    {
        id: 1,
        user: "Maksimus",
        topic: "Не работают сервера",
        message: "Здравствуйте, не работают сервера",
        status: 0,
        date: "1641168000000"
    },
    {
      id: 2,
      user: "Maksimus",
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 2,
      date: "1640995200000"
    },
    {
      id: 3,
      user: "Maksimus",
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 3,
      date: "1640908800000"
    },
    {
      id: 4,
      user: "Maksimus",
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 4,
      date: "1640563200000"
    },
    {
      id: 5,
      user: "Maksimus",
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 1,
      date: "1641513600000"
    },
    {
      id: 6,
      user: "Maksimus",
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 1,
      date: "1641513600000"
    },
    {
      id: 7,
      user: "Maksimus",
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 1,
      date: "1640563200000"
    },
    
];

const AdminSupport = () => {
    const [tickets, setTickets] = useState([])
    const [shownFields, setShownFields] = useState([])
    const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerms[0])
    const [editFieldsActive, setEditFieldsActive] = useState(false)
    const [addOrEdit, setAddOrEdit] = useState("add")
    const [editedFields, setEditedFields] = useState([])
    
    useEffect(() => {
        const getTickets = async() => {
            await setTimeout( () => { 
                setTickets(testData)
                setShownFields(testData)
            }, 1000)
        }

        getTickets()
    }, [])

    function dateToString(dateInNumber, needTimeVal) {
        let date = new Date(Number(dateInNumber));
        if(needTimeVal) 
          return date.toLocaleDateString('ru-RU') + " " + date.getHours() + ":" + date.getMinutes();
        else
        return date.toLocaleDateString('ru-RU');
    }

    const dataColumns = [
        "Пользователь", "Тема", "Сообщение", "Статус", "Дата" 
    ];

    const dataColumnsInfo = { // Названия полей и тип
        user: {
            placeholder: "Логин пользователя",
            type: "text",
            reqired: true
        },
        topic: {
            placeholder: "Тема",
            type: "text",
            reqired: true
        },
        message: {
            placeholder: "Сообщение",
            type: "textarea",
            reqired: true
        },
        status: {
            placeholder: "Статус",
            type: "status",
            statusMap: statusMap,
            reqired: true
        },
        date: {
            placeholder: "Дата",
            type: "date",
            reqired: true
        },
    }

    const editCLick = (editedField, e) => {
        e.stopPropagation()
        setAddOrEdit("edit")
        setEditedFields(editedField)
        setEditFieldsActive(true)
    }

    const addClick = () => {
        setAddOrEdit("add")
        setEditedFields(emptyUser)
        setEditFieldsActive(true)
    }

    const renderData = (v, i) => {
        return (
            <DataTableColumn onClick={() => window.location.href=`../support-request/${v.id}`} key={i}>
                <td>{v.user}</td>
                <td>{v.topic}</td>
                <td>{v.message}</td>
                <td><StatusBar status={v.status} map={statusMap}/></td>
                <td className="p-right-40">{dateToString(v.date, false)}</td>
                <td className="p-right-40" onClick={(e) => editCLick(v, e)}><Icon style={{cursor: "pointer"}} id="edit"/></td>
                <RemoveButton actionFunc={removeUser} dataForAction={[v.id]} ><td className="p-right-40"><Icon style={{cursor: "pointer"}} id="delete"/></td></RemoveButton>
            </DataTableColumn>
        );
    }

    const addUser = (newTicket) => {
        setTickets([newTicket, ...tickets]);
    }

    const editUser = (editedTicket) => {
        tickets.forEach((user, idx) => {
            if(user.id == editedTicket.id){
                tickets[idx] = {...editedTicket};
            }
        });
        setTickets([...tickets]);
    }

    const removeUser = (id) => {
        if(id != "") {
            tickets.forEach((ticket, idx) => {
                if(ticket.id == id){
                    tickets.splice(idx,1);
                }
            });
            setTickets([...tickets]);
        }
    }

    const onDataChange = (data) => {
        setShownFields(data);
    }

    return (
        <PageContainer>
            <DataTableContainer>
                <DataTableHeader>
                    <a className="a-main-menu a-main-menu-billing items-center display-flex" style={{marginRight: 20}}>Темы</a>
                    <SearchBar data={tickets} onDataChange={onDataChange} filterField={currentSearchTerm.value}/>
                    <SearchSelect searchTerms={searchTerms} currentSearchTerm={currentSearchTerm} setCurrentSearchTerm={setCurrentSearchTerm}/>
                    <Button onClick={() => addClick()} className="admin_add_button">Добавить Тему</Button>
                </DataTableHeader>
                <DataTable emptyText="Услуги не найдены." 
                    linesLimit={6} data={shownFields} columns={dataColumns} render={renderData}/>
            </DataTableContainer>
            <AdminFieldsPopup
                active={editFieldsActive}
                setActive={setEditFieldsActive}
                header="Тема"
                fieldsForChange={editedFields}
                fieldsForChangeInfo={dataColumnsInfo}
                edit={editUser}
                add={addUser}
                addOrEdit={addOrEdit}
            />
        </PageContainer>
    )
};

export default AdminSupport