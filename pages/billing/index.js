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

const Billing = (props) => {
    const [tableData, setDataTable] = useState(testData);

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
                                        {`Биллинг`}
                                        <div className="arrow">
                                            <span className="arrow-left"></span>
                                            <span className="arrow-right"></span>
                                        </div>
                                    </a>
                                </DropdownHead>
                                <DropdownBody>
                                    <ul className={"submenu submenu-billing"}>
                                        <a class="items-center display-flex" href="/history">История зачислений</a>
                                    </ul>    
                                </DropdownBody>
                            </Dropdown>
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

export default Billing