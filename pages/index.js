
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Button from '../components/Assets/Button'
import DataTable from '../components/Assets/DataTable'
import DataTableColumn from '../components/Assets/DataTableColumn'
import DataTableContainer from '../components/Assets/DataTableContainer'
import DataTableHeader from '../components/Assets/DataTableHeader'
import SearchBar from '../components/Assets/SearchBar'
import BalanceBlock from '../components/Blocks/BalanceBlock'
import MarketingBlock from '../components/Blocks/MarketingBlock'
import ProfileBlock from '../components/Blocks/ProfileBlock'
import SupportBlock from '../components/Blocks/SupportBlock'
import styles from '../styles/Home.module.css'


import useTranslation from 'next-translate/useTranslation';
import I18nProvider from 'next-translate/I18nProvider';
import Trans from 'next-translate/Trans';
import StatusBar from '../components/Assets/StatusBar'
import PageContainer from '../components/Assets/PageContainer';
import {usePageLoadState} from '../components/Context/PageLoadedContext';

const testMarketingData = [
    {
        id: "1",
        img: "",
        text: "Помогите детям и получите сертификат с памятной монетой",
        color: "#1A2027"
    },
    {
        id: "2",
        img: "",
        text: "Помогите детям и получите сертификат с памятной монетой",
        color: "#F74A25"
    },
    {
        id: "3",
        img: "",
        text: "Помогите детям и получите сертификат с памятной монетой",
        color: "#0688FF"
    },
    {
        id: "4",
        img: "",
        text: "Помогите детям и получите сертификат с памятной монетой",
        color: "#00A459"
    }
]

const testTableData = [
    {
        name: "test",
        state: 0,
        price: 43232,
        date: 54353453,
        monthly: true
    },{
        name: "test2",
        state: 1,
        price: 3232,
        date: 54353453
    },{
        name: "test3",
        state: 2,
        price: 72867,
        date: 54353453
    },{
        name: "test3",
        state: 3,
        price: 72867,
        date: 54353453
    },{
        name: "test3",
        state: 2,
        price: 72867,
        date: 54353453
    },{
        name: "test3",
        state: 2,
        price: 72867,
        date: 54353453
    },{
        name: "test3",
        state: 2,
        price: 72867,
        date: 54353453
    },{
        name: "test3",
        state: 2,
        price: 72867,
        date: 54353453
    },
]

export default function Home() {
    const [tableData, setTableData] = useState([]);
    const [shownData, setShownData] = useState([]);
    const [marketingData, setMarketingData] = useState([])
    const { t, lang } = useTranslation('home')
    const [pageLoaded, setPageLoaded] = usePageLoadState();

    useEffect(() => {
        const getData = async() => {
            await setTimeout( () => { 
                setTableData(testTableData);
                setShownData(testTableData);
                setMarketingData(testMarketingData);
                setPageLoaded(true);
            }, 1000)
        }
        getData();
    }, [])

    const renderData = (v, i) => {
        return (
            <DataTableColumn key={i}>
                <td>{v.name}</td>
                <td><StatusBar status={v.state}/></td>
                <td>{v.price} ₽{v.monthly ? `/мес.` : ""}</td>
                <td>{v.date}</td>
            </DataTableColumn>
        );
    }

    const onDataChange = (data) => {
        /* setTableData(data); */
        setShownData(data);
    };

    const dataColumns = [
        "Название продукта", "Статус", "Цена", "Действует до" 
    ];

    return (
        <PageContainer>
            <MarketingBlock posts={marketingData}/>
            <section className="about-user display-flex">
                <ProfileBlock/>
                <BalanceBlock/>
                <SupportBlock/>
            </section>
            <DataTableContainer>
                <DataTableHeader>
                    <h1>{t`datatable_title`}</h1>
                    <SearchBar data={tableData} onDataChange={onDataChange} filterField="name"/>
                    <Button href="/services" className="order-service">{t`datatable_button`}</Button>
                </DataTableHeader>
                <DataTable emptyText="Услуги не найдены." 
                    linesLimit={6} data={shownData} columns={dataColumns} render={renderData}/>
            </DataTableContainer>
        </PageContainer>
    )
}
