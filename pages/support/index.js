import Button from "../../components/Assets/Button";
import DataTable from "../../components/Assets/DataTable";
import DataTableContainer from "../../components/Assets/DataTableContainer";
import DataTableHeader from "../../components/Assets/DataTableHeader";
import DataTableColumn from '../../components/Assets/DataTableColumn'
import PageContainer from "../../components/Assets/PageContainer";
import { Dropdown, DropdownBody, DropdownHead } from "../../components/Assets/Dropdown";
import { useState } from 'react'

import StatusBar from '../../components/Assets/StatusBar';
import RiseBalancePopup from "../../components/Popups/RiseBalancePopup";

const testData = [
    {
        id: 1,
        topic: "Не работают сервера",
        message: "Здравствуйте, не работают сервера",
        status: 0,
        date: "20 июля 2022 г."
    },
    {
      id: 2,
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 2,
      date: "20 июля 2022 г."
    },
    {
      id: 3,
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 3,
      date: "20 июля 2022 г."
    },
    {
      id: 4,
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 4,
      date: "20 июля 2022 г."
    },
    {
      id: 5,
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 1,
      date: "20 июля 2022 г."
    },
    {
      id: 6,
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 1,
      date: "20 июля 2022 г."
    },
    {
      id: 7,
      topic: "Не работают сервера",
      message: "Здравствуйте, не работают сервера",
      status: 1,
      date: "20 июля 2022 г."
    },
    
];

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

const Support = (props) => {
    const [tableData, setDataTable] = useState(testData);

    function dateToString(dateInNumber, needTimeVal) {
      let date = new Date(Number(dateInNumber));
      if(needTimeVal) 
        return date.toLocaleDateString('ru-RU') + " " + date.getHours() + ":" + date.getMinutes();
      else
      return date.toLocaleDateString('ru-RU');
    }

    const dataColumns = [
        "Тема", "Сообщение", "Статус", "Дата" 
    ];

    const renderData = (v, i) => {
        console.log(v);
        return (
            <DataTableColumn onClick={() => window.location.href=`../support-request/${v.id}`} key={i}>
                <td>{v.topic}</td>
                <td>{v.message}</td>
                <td><StatusBar status={v.status} map={statusMap}/></td>
                <td>{dateToString(v.date, false)}</td>
            </DataTableColumn>
        );
    }

    return (
        <PageContainer>
            <DataTableContainer>
                <DataTableHeader>
                    <nav class="main-menu">
                        <ul>
                            <li>
                              <h1 className="a-main-menu a-main-menu-billing items-center display-flex">
                                  {`Поддержка`}
                              </h1>   
                            </li>
                        </ul>
                    </nav>
                    <RiseBalancePopup/>
                </DataTableHeader>
                <DataTable emptyText="Услуги не найдены." 
                    linesLimit={6} data={tableData} columns={dataColumns} render={renderData}/>
            </DataTableContainer>
        </PageContainer>
    )
};

export default Support;