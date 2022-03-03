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
        firstName: "",
        middleName: "",
        lastName: "",
        group: 0,
        login: "",
        password: "",
        status: 0,
        phone: "",
        email: ""
    }
}

const searchTerms = [
    {
        text: "По имени пользователя",
        value: "firstName"
    },
    {
        text: "По фамилии пользователя",
        value: "lastName"
    },
    {
        text: "По отчеству пользователя",
        value: "middleName"
    },
    {
        text: "По логину",
        value: "login"
    },
    {
        text: "По паролю",
        value: "password"
    },
    {
        text: "По телефону",
        value: "phone"
    },
    {
        text: "По почте",
        value: "email"
    },
]

const statusMapUser = [
    {
        prefix: "unknown",
        text: "Неизвестно"
    },
    {
        prefix: "blue",
        text: "Активен"
    },{
        prefix: "red",
        text: "Закрыт"
    },
]

const statusUserGroup = [
    {
        prefix: "unknown",
        text: "Обычный"
    },
    {
        prefix: "blue",
        text: "Админ"
    },{
        prefix: "green",
        text: "Саппорт"
    },
]

const testData = [
    {
        id: 1,
        firstName: "Антон",
        lastName: "Алохин",
        middleName: "Васильевич",
        group: 0,
        login: "antoha",
        password: "3231",
        status: 1,
        phone: "+79999999999",
        email: "antoha@gmail.com"
    },
    {
        id: 2,
        firstName: "Антон2",
        lastName: "Алохин2",
        middleName: "Васильевич2",
        group: 0,
        login: "antoha",
        password: "3231",
        status: 2,
        phone: "+79999999999",
        email: "antoha@gmail.com"
    },
    {
        id: 3,
        firstName: "Антон3",
        lastName: "Алохин3",
        middleName: "Васильевич3",
        group: 0,
        login: "antoha",
        password: "3231",
        status: 3,
        phone: "+79999999999",
        email: "antoha@gmail.com"
    },
    {
        id: 4,
        firstName: "Антон4",
        lastName: "Алохин4",
        middleName: "Васильевич4",
        group: 0,
        login: "antoha",
        password: "3231",
        status: 4,
        phone: "+79999999999",
        email: "antoha@gmail.com"
    },
];

const Users = () => {
    const [users, setUsers] = useState([])
    const [shownFields, setShownFields] = useState([])
    const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerms[0])
    const [editFieldsActive, setEditFieldsActive] = useState(false)
    const [addOrEdit, setAddOrEdit] = useState("add")
    const [editedFields, setEditedFields] = useState([])
    
    useEffect(() => {
        const getUsers = async() => {
            await setTimeout( () => { 
                setUsers(testData)
                setShownFields(testData)
            }, 1000)
        }

        getUsers()
    }, [])

    
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
        firstName: {
            placeholder: "Имя",
            type: "text",
            reqired: true
        },
        middleName: {
            placeholder: "Отчество",
            type: "text"
        },
        lastName: {
            placeholder: "Фамилия",
            type: "text",
            reqired: true
        },
        group: {
            placeholder: "Группа",
            type: "status",
            statusMap: statusUserGroup,
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
        status: {
            placeholder: "Статус",
            type: "status",
            statusMap: statusMapUser,
            reqired: true
        },
        phone: {
            placeholder: "Телефон",
            type: "phone",
            reqired: true
        },
        email: {
            placeholder: "Почта",
            type: "email",
            reqired: true
        },
    }
    
    const dataColumns = [
        "Имя", "Фамилия", "Отчество", "Группа", "Login", "Password", "Статус" , "Телефон" , "Почта"
    ]

    const renderData = (v, i) => {
        return (
            <DataTableColumn key={i}>
                <td>{v.firstName}</td>
                <td>{v.lastName}</td>
                <td>{v.middleName}</td>
                <td><StatusBar status={v.group} map ={statusUserGroup}/></td>
                <td>{v.login}</td>
                <td>{v.password}</td>
                <td><StatusBar status={v.status} map ={statusMapUser}/></td>
                <td>{v.phone}</td>
                <td className="p-right-40">{v.email}</td>
                <td className="p-right-40"><Icon style={{cursor: "pointer"}} id="edit" onClick={() => editCLick(v)} /></td>
                <td className="p-right-40"><RemoveButton actionFunc={removeUser} dataForAction={[v.id]} ><Icon style={{cursor: "pointer"}} id="delete" /></RemoveButton></td>
            </DataTableColumn>
        );
    }

    const addUser = (newUser) => {
        setUsers([newUser, ...users]);
    }

    const editUser = (editedUser) => {
        users.forEach((user, idx) => {
            if(user.id == editedUser.id){
                users[idx] = {...editedUser};
            }
        });
        setUsers([...users]);
    }

    const removeUser = (id) => {
        if(id != "") {
            users.forEach((user, idx) => {
                if(user.id == id){
                    users.splice(idx,1);
                }
            });
            setUsers([...users]);
        }
    }

    const onDataChange = (data) => {
        setShownFields(data);
    }

    const TestMeth = () => {
        return (
            <>
                <SearchBar data={users} onDataChange={onDataChange} filterField={currentSearchTerm.value}/>
                <SearchSelect searchTerms={searchTerms} currentSearchTerm={currentSearchTerm} setCurrentSearchTerm={setCurrentSearchTerm}/>
                <Button onClick={() => addClick()} className="admin_add_button">Добавить пользователя</Button>
            </>
        );
    }

    return (
        <PageContainer>
            <DataTableContainer>
                <DataTableHeader>
                    <h1 className="a-main-menu a-main-menu-billing items-center display-flex" style={{marginRight: 20}}>Пользователи</h1>
                    <SearchBar data={users} onDataChange={onDataChange} filterField={currentSearchTerm.value}/>
                    <SearchSelect searchTerms={searchTerms} currentSearchTerm={currentSearchTerm} setCurrentSearchTerm={setCurrentSearchTerm}/>
                    <Button onClick={() => addClick()} className="admin_add_button">Добавить пользователя</Button>
                </DataTableHeader>
                <DataTable emptyText="Услуги не найдены." 
                    linesLimit={6} data={shownFields} columns={dataColumns} render={renderData}/>
            </DataTableContainer>
            <AdminFieldsPopup
                active={editFieldsActive}
                setActive={setEditFieldsActive}
                header="Изменить пользователя"
                fieldsForChange={editedFields}
                fieldsForChangeInfo={dataColumnsInfo}
                edit={editUser}
                add={addUser}
                addOrEdit={addOrEdit}
            />
        </PageContainer>
    )
};

export default Users