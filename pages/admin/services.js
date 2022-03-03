import Button from "../../components/Assets/Button";
import Icon from "../../components/Assets/Icon";
import DataTable from "../../components/Assets/DataTable";
import DataTableContainer from "../../components/Assets/DataTableContainer";
import DataTableHeader from "../../components/Assets/DataTableHeader";
import DataTableColumn from '../../components/Assets/DataTableColumn'
import PageContainer from "../../components/Assets/PageContainer";
import SearchBar from "../../components/Assets/SearchBar";
import SearchSelect from "../../components/Assets/SearchSelect";
import { useState, useEffect } from 'react'

import StatusBar from '../../components/Assets/StatusBar'
import AdminFieldsPopup from "../../components/Popups/AdminFieldsPopup"

const emptyService = () => {
    return {
        id: Date.now(),
        name: "Название",
        description: "Описание",
        img: [""],
        specifications: [],
        os: []
    }
}

const dataColumnsInfo = { // Названия полей и их тип
    name: {
        placeholder: "Название услуги",
        type: "text",
        reqired: true
    },
    description: {
        placeholder: "Описание услуги",
        type: "text",
        reqired: true
    },
    img: {
        placeholder: "Изображение",
        type: "file",
        reqired: true
    },
    specifications: {
        placeholder: "",
        type: "nested",
        nestedType: "spec"
    },
    os: {
        placeholder: "",
        type: "nested",
        nestedType: "os"
  }
}

const testData = [
    {
        id: 1,
        name: "Виртуальный сервер",
        description: "для сайтов с высокой нагрузкой",
        img: ["data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMgMzcuNDQ4M1YyOS42NTI5QzMgMjkuMjY2IDMuMDYwMjYgMjguODgxMyAzLjE3ODY1IDI4LjUxMzNMMTAuNTQ4NiA1LjU4NDUyQzExLjA0MzYgNC4wNDQ0IDEyLjQ3NjMgMyAxNC4wOTQxIDNINDUuOTA1OEM0Ny41MjM2IDMgNDguOTU2MiA0LjA0NDQgNDkuNDUxNSA1LjU4NDUyTDU2LjgyMTIgMjguNTEzM0M1Ni45Mzk3IDI4Ljg4MTMgNTcgMjkuMjY2IDU3IDI5LjY1MjlWMzcuNDQ4M00xNC4xNzI0IDQyLjEwMzRIMTkuNzU4Nk0zMi43OTMxIDQyLjEwMzRINDUuODI3Nk0zIDI5LjA2OUg1N1Y1My4yNzU5QzU3IDU1LjMzMjcgNTUuMzMyNyA1NyA1My4yNzU5IDU3SDYuNzI0MTRDNC42NjczMyA1NyAzIDU1LjMzMjcgMyA1My4yNzU5VjI5LjA2OVoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="],
        specifications: [
            {
                name: "Легитимный канал",
                price: 7,
                measurement: "Мбит/с",
                min: 1,
                max: 50
            },
            {
                name: "CPU",
                price: 5,
                measurement: "ядро;ядра;ядер",
                min: 1,
                max: 90
            },
            {
                name: "SSD",
                price: 7,
                measurement: "Гб",
                min: 0,
                max: 50
            },
            {
                name: "ОЗУ",
                price: 7,
                measurement: "Гб",
                min: 0,
                max: 50
            },
        ],
        os: [
            {
              name: "Centos",
              img: "data:image/png;base64,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",
              versions: [
                {
                  name: "Centos 6",
                  price: 1
                },
                {
                  name: "Centos 7",
                  price: 2
                },
                {
                  name: "Centos 8",
                  price: 3
                },
              ]
            },
            {
              name: "Debian",
              img: "data:image/png;base64,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",
              versions: [
                {
                  name: "Debian 8",
                  price: 11
                },
                {
                  name: "Debian 9",
                  price: 12
                },
                {
                  name: "Debian 10",
                  price: 13
                },
              ]
            },
            {
              name: "Ubuntu",
              img: "data:image/png;base64,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",
              versions: [
                {
                  name: "Ubuntu 16.04",
                  price: 21
                },
                {
                  name: "Ubuntu 18.04",
                  price: 22
                },
                {
                  name: "Ubuntu 20.04",
                  price: 23
                },
              ]
            },
            {
              name: "Windows Server",
              img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA/CAYAAABU6B73AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHESURBVHic7du/ahRRGIbx5zsbJlk1myaNXaKFRUQQvACvQIiwuQVrK1NOp+JV2GavwUpIZWcZFYvYCYYgk8n+mWMxL+uioI0cDLy/6uzZhe/wMDtbDBsAHL7fJ+IVxcQpz/ceAvDs3RasvyXFtSKjc1yQp094ef94dXtNb24Ct4scpDdYrqJKELtkbpQZnRsG1fDX3VRm+P/PIcQhxCHEIcQhxCHEIcQhxCHEIcQhxCHEIcQhxCHEIcQhxCHEIcQhxCHEIcQhpH/AE+kSum/lxubz5bJdZDbSGTArMzsuyIv5b7v9uXIwKXh1TCYwOVgsXx/lwR8+/a+Hw8G4g8jlZl4h/RXx9HjIcHNUbGpVLajvfAWgrhPf97epUpSZPcxweUa9N13d7u8R1WhMx+siBwFo55+B3X79eIu19JGu0EPgtm1I8Qh4s7rtXw1xCHEIcQhxCHEIcQhxCHEIcQhxCHEIcQhxCHEIcQhxCHEIcQhxCHEIcQhxCHEIcQjR3x27cyKdlBubv/xcTjvY+EBwvdDsltw1ZWbZ1dU/ga5PRjTNzWJTU8x4ce8TAOOjATt3bxGzMverQc6sz0+pH/jrYfZ3PwC/611TlaG1SgAAAABJRU5ErkJggg==",
              versions: [
                {
                  name: "Windows Server 2012 R2",
                  price: 31
                },
                {
                  name: "Windows Server 2016",
                  price: 32
                },
                {
                  name: "Windows Server 2019",
                  price: 33
                },
              ]
            }
          ]
    },
];

const AdminSupport = () => {
    const [services, setServices] = useState([])
    const [servicesLoading, setServicesLoading] = useState(false)
    const [editFieldsActive, setEditFieldsActive] = useState(false)
    const [addOrEdit, setAddOrEdit] = useState("add")
    const [editedFields, setEditedFields] = useState([])
  
    useEffect(() => {
        setServicesLoading(true)
        const getServices = async() => {
            await setTimeout( () => { 
            setServices(testData)
            setServicesLoading(false)
            }, 1000)
        }
        getServices()
    }, [])

    const editCLick = (editedField) => {
        setAddOrEdit("edit")
        setEditedFields(editedField)
        setEditFieldsActive(true)
    }

    const addClick = () => {
      setAddOrEdit("add")
      setEditedFields(emptyService())
      setEditFieldsActive(true)
    }

    const editService = (editedService) => {
        services.forEach((service, idx) => {
            if(service.id == editedService.id){
                services[idx] = {...editedService};
            }
        });
        setServices([...services]);
    }

    const addService = (newService) => {
        setServices([newService, ...services]);
    }

    return (
        <PageContainer>
            <section className="products display-flex">
            <div className="for-user for-product for-product-admin admin_add_banner cursor-pointer items-center display-flex direction-column" onClick={() => addClick()}></div>
            {
                servicesLoading ?
                [0,1,2,3].map((service) => 
                    <div className="for-user for-product items-center display-flex direction-column" key={service.id}>
                        <div><div className="empty_img"></div></div>
                        <h1><p className="empty_product_name"></p></h1>
                        <h3><span><p className="empty_product_description"></p></span></h3>
                        <h5 style={{display: "flex", flexFlow: "row nowrap"}}>от <p className="empty_product_price"></p> ₽/мес</h5>
                        <button>Конфигуратор</button>
                    </div>
                )
                : 
                services.map((service) => 
                    <div className="for-user for-product for-product-admin items-center display-flex direction-column" key={service.id}>
                        <div><img src={service.img}/></div>
                        <h1>{service.name}</h1>
                        <h3><span>{service.description}</span></h3>
                        {
                            service.specifications.map((spec) =>
                            <div className="services_specs">
                                <h3>{spec.name}: {spec.price}₽ за {spec.measurement}</h3>
                                <h4>Минимум: {spec.min} | Максимум: {spec.max}</h4>
                            </div>
                            )
                        }
                        <div className="for-OS direction-column admin_os">
                          {
                              service.os.map((osItem) => 
                                  <div className="services_specs">
                                      <h2 className="items-center display-flex"><img style={{width: 50}} src={osItem.img}/>{osItem.name}</h2>
                                      <div className="for-inputs direction-column admin_vers">
                                      {
                                          osItem.versions.map((version) => 
                                              <p>{version.name}: {version.price}₽</p>
                                          )
                                      }
                                      </div>
                                  </div>
                              )
                          }
                        </div>
                        
                        <button onClick={() => window.location.href=`/configurator/${service.id}`}>Конфигуратор</button>
                        <button onClick={() =>  editCLick(service)}>Редактировать</button>
                        
                    </div>
                )
            }
            <AdminFieldsPopup
                active={editFieldsActive}
                setActive={setEditFieldsActive}
                header="Изменить"
                fieldsForChange={editedFields}
                fieldsForChangeInfo={dataColumnsInfo}
                edit={editService}
                add={addService}
                addOrEdit={addOrEdit}
            />
            </section>
        </PageContainer>
    )
};

export default AdminSupport