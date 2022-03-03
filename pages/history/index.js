import Button from "../../components/Assets/Button";
import DataTable from "../../components/Assets/DataTable";
import DataTableContainer from "../../components/Assets/DataTableContainer";
import DataTableHeader from "../../components/Assets/DataTableHeader";
import DataTableColumn from '../../components/Assets/DataTableColumn'
import PageContainer from "../../components/Assets/PageContainer";
import SearchBar from "../../components/Assets/SearchBar";
import { Dropdown, DropdownBody, DropdownHead } from "../../components/Assets/Dropdown";
import { useState } from 'react'

import StatusBar from '../../components/Assets/StatusBar'
import RiseBalancePopup from "../../components/Popups/RiseBalancePopup"

const testData = [
    {
        sum: "67 200",
        date: "20 июля 2022 г.",
        paymentMethod: "Payeer Wallet",
        status: 1
    },{
        sum: "250 000",
        date: "20 июля 2022 г.",
        paymentMethod: "Payeer Wallet",
        status: 1
    },{
        sum: "250 000",
        date: "20 июля 2022 г.",
        paymentMethod: "Payeer Wallet",
        status: 3
    },{
        sum: "250 000",
        date: "20 июля 2022 г.",
        paymentMethod: "Payeer Wallet",
        status: 1
    },{
        sum: "250 000",
        date: "20 июля 2022 г.",
        paymentMethod: "Payeer Wallet",
        status: 3
    },{
        sum: "67 200",
        date: "20 июля 2022 г.",
        paymentMethod: "Payeer Wallet",
        status: 1
    },{
        sum: "67 200",
        date: "20 июля 2022 г.",
        paymentMethod: "Payeer Wallet",
        status: 1
    },{
        sum: "67 200",
        date: "20 июля 2022 г.",
        paymentMethod: "Payeer Wallet",
        status: 1
    },{
        sum: "67 200",
        date: "20 июля 2022 г.",
        paymentMethod: "Payeer Wallet",
        status: 1
    },
];

const History = (props) => {
    const [tableData, setDataTable] = useState(testData);
    const [balancePopup, setbalancePopup] = useState(false);

    const dataColumns = [
        "Сумма пополнения", "Дата", "Способ оплаты", "Статус платежа" 
    ];

    const renderData = (v, i) => {
        console.log(v);
        return (
            <DataTableColumn key={i}>
                <td>{v.sum}</td>
                <td>{v.date}</td>
                <td>{v.paymentMethod}</td>
                <td><StatusBar status={v.status}/></td>
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
                        <Dropdown>
                            <DropdownHead>
                                <a className="a-main-menu a-main-menu-billing items-center display-flex">
                                    {`История зачислений`}
                                    <div className="arrow">
                                        <span className="arrow-left"></span>
                                        <span className="arrow-right"></span>
                                    </div>
                                </a>
                            </DropdownHead>
                            <DropdownBody>
                                <ul className={"submenu submenu-billing"}>
                                    <a class="items-center display-flex" href="/billing">Биллинг</a>
                                </ul>    
                            </DropdownBody>
                        </Dropdown>
                        </li>
                    </ul>
                </nav>
                    <Button className="button insert-balance order-service button-from-history" onClick={() => setbalancePopup(!balancePopup)}>
                        {`Пополнить баланс`}
                        <img src="/assets/img/arrow-up-r.svg" class="img-arrow"></img>
                    </Button>
                </DataTableHeader>
                <DataTable emptyText="Услуги не найдены." 
                    linesLimit={6} data={tableData} columns={dataColumns} render={renderData}/>
            </DataTableContainer>
            
        </PageContainer>
    )
};

export default History