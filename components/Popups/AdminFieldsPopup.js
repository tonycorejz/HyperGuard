import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Assets/Button";
import InputMask from 'react-input-mask';
import Icon from "../../components/Assets/Icon";
import UploadFile from "../../components/Assets/UploadFile";


const AdminFieldsPopup = ({active, setActive, header, fieldsForChange, fieldsForChangeInfo, edit, add, addOrEdit}) => {
    const popupContent = useRef(null)
    const [fields, setFields] = useState(JSON.parse(JSON.stringify(fieldsForChange)))

    useEffect(() => {
        setFields(JSON.parse(JSON.stringify(fieldsForChange)))
    }, [fieldsForChange, active])

    const checkClickOutside = (e) => {
        if(popupContent && !popupContent.current.contains(e.target))
            setActive(false)
    }

    const checkValidFields = () => {
        let notValidKeys = ""
        Object.keys(fields).forEach((key, idx) => {
            if(fields[key] === '' && fieldsForChangeInfo[key].reqired) {
                notValidKeys = key
            }
        })
        if(notValidKeys === "")
            return true
        else
            return false
    }

    const onEdit = (e) => {
        e.preventDefault();
        if(checkValidFields()) {
            edit(fields)
            setActive(false)
        }
    }

    const onAdd = (e) => {
        e.preventDefault();
        if(checkValidFields()) {
            add(fields)
            setActive(false)
        }
    }

    const editedFieldsChange = (value, field) => {
        setFields({...fields, [field]: value})
    }

    const fileRender = (currentField, key) => {
        const setFile = (base64) => {
            editedFieldsChange(base64, key)
        }

        return (
            <div className="admin_upload">
                <UploadFile setFile={setFile} fileState={currentField} multiple={false}/>
            </div>
        )
    }

    const statusRender = (currentField, key, info) => {

        return (
            <select onChange={e => editedFieldsChange(e.target.value, key)}>
            {
                info.statusMap.map((map, idx) => 
                    <>
                        <option selected={idx == currentField} value={idx}>{map.text}</option>
                    </>
                )
            }
            </select>
        )
    }

    const textareaRender = (currentField, key) => {
        return (
            <textarea value={currentField} onChange={e => editedFieldsChange(e.target.value, key)}/>
        )
    }

    const dateTimePicker = (currentField, key, info, withTime) => {

        let date = new Date(Number(currentField))
        let hours = date.getHours()
        let hoursInMilliseconds = hours * 60000 * 60
        let minutes = date.getMinutes()
        let minutesInMilliseconds = minutes * 60000

        const dateToString = (date) => {
            let month = (date.getMonth() + 1);               
            let day = date.getDate();
            if (month < 10) 
                month = "0" + month;
            if (day < 10) 
                day = "0" + day;
            return date.getFullYear() + '-' + month + '-' + day;
        }

        const setDate = (changedDate) => {
            let fullDate = new Date(changedDate)
            fullDate = fullDate.getTime() - 25200000
            if(withTime) {
                fullDate += hoursInMilliseconds + minutesInMilliseconds
            }
            editedFieldsChange(fullDate, key)
        }

        const setHours = (changedHours) => {
            let changedHoursDate = date - hoursInMilliseconds + (changedHours * 60000 * 60)
            editedFieldsChange(changedHoursDate, key)
        }

        const setMinutes = (changedMinutes) => {
            let changedMinutesDate = date - minutesInMilliseconds + (changedMinutes * 60000)
            editedFieldsChange(changedMinutesDate, key)
        }

        return(
            <>
                <input placeholder={info.placeholder} type="date" value={dateToString(date)} onChange={e => setDate(e.target.value)}/>
                {
                withTime && 
                <div className="time_input">
                    <input placeholder="часы" type="number" min="0" max="23" value={hours} onChange={e => setHours(e.target.value)}/> 
                    <div className="margin-x-5">:</div> 
                    <input placeholder="минуты" type="number" min="0" max="59" value={minutes} onChange={e => setMinutes(e.target.value)}/>
                </div>
                }
            </>
        )
    }

    const osRender = (currentField, add, remove, edit) => {
        const epmtyOs = () => {
            return {
                name: "",
                img: [],
                versions: [
              ]
            }
        }

        const emptyVer = () => { return {name: "", price: ""} }

        const addVer = (idx) => {
            setFields({...fields, os: [...currentField].map((currentOs, osIdx) =>
                    (osIdx == idx) ?
                    {...currentOs, versions: [...currentOs.versions, emptyVer()] } :
                    currentOs
                )
            })
        }

        const editVer = (idx, verIdx, fieldName, value) => {
            setFields({...fields, os: [...currentField].map((currentOs, osIdx) =>
                    (osIdx == idx) ?
                    {...currentOs, versions: [...currentOs.versions].map((currentVer, crntVerIdx) => 
                        (crntVerIdx == verIdx) ?
                        {...currentVer, [fieldName]: value} :
                        currentVer
                    ) } :
                    currentOs
                )
            })
        }

        const removeVer = (idx, verIdx) => {
            fields.os[idx].versions.splice(verIdx, 1)
            setFields({...fields})
        }

        return (
            <div className="display-flex specs_cont">
                 <div className="spec_box border_orange admin_add_banner cursor-pointer" onClick={() => add(epmtyOs())}></div>
                {    
                    currentField.map((os, idx) =>
                        {
                            const setFile = (base64) => edit(base64, "img", idx)

                            return (
                                <div className="spec_box border_orange">
                                    <div style={{marginBottom: 5, width: 100+'%', textAlign: "center"}} className="display-flex direction-row items-center contet-space-b">
                                        <h2>ОС{idx}</h2>
                                        <Icon style={{cursor: "pointer"}} id="delete" onClick={() => remove(idx)}/>
                                    </div>
                                    <h4 style={{marginBottom: 5}}>Название</h4>
                                    <input type="text" value={os.name} onChange={(e) => edit(e.target.value, "name", idx)} />
                                    <h4 style={{marginBottom: 5, marginRight: 5}}>Лого:</h4>
                                    <div className="admin_upload">
                                        <UploadFile setFile={setFile} fileState={currentField} multiple={false}/>
                                    </div>
                                    <div className="display-flex direction-column versions_cont admin_add_banner cursor-pointer" onClick={() => addVer(idx)}></div>
                                    {
                                        os.versions.map((ver, verIdx) =>
                                            <div className="display-flex direction-column versions_cont">
                                                <Icon style={{cursor: "pointer", alignSelf: "flex-end"}} id="close_popup" format="png" onClick={() => removeVer(idx, verIdx)} />
                                                <h4 style={{marginBottom: 5}}>Имя системы</h4>
                                                <input type="text" value={ver.name} onChange={e => editVer(idx, verIdx, "name", e.target.value)} />
                                                <h4 style={{marginBottom: 5}}>Цена системы</h4>
                                                <input type="number" value={ver.price} onChange={e => editVer(idx, verIdx, "price", e.target.value)}/>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        
                    )
                }
            </div>
        )
    }

    const specRender = (currentField, add, remove, edit) => {
        const epmtySpec = () => {
            return {
                name: "",
                price: 0,
                measurement: "",
                min: 1,
                max: 100
            }
        }

        return (
            <div className="display-flex specs_cont">
                 <div className="spec_box admin_add_banner cursor-pointer" onClick={() => add(epmtySpec())}></div>
                {    
                    currentField.map((spec, idx) =>
                        <div className="spec_box">
                            <div style={{marginBottom: 5, width: 100+'%', textAlign: "center"}} className="display-flex direction-row items-center contet-space-b">
                                <h2>Хар.{idx}</h2>
                                <Icon style={{cursor: "pointer"}} id="delete" onClick={() => remove(idx)}/>
                            </div>
                            <h4 style={{marginBottom: 5}}>Имя</h4>
                            <input type="text" value={spec.name} onChange={(e) => edit(e.target.value, "name", idx)} />
                            <h4 style={{marginBottom: 5}}>Цена</h4>
                            <input type="number" value={spec.price} onChange={(e) => edit(e.target.value, "price", idx)} />
                            <h4 style={{marginBottom: 5}}>Измерение</h4>
                            <input type="text" value={spec.measurement} onChange={(e) => edit(e.target.value, "measurement", idx)} />
                            <h4 style={{marginBottom: 5}}>Минимальное значение</h4>
                            <input type="number" value={spec.min} onChange={(e) => edit(e.target.value, "min", idx)} />
                            <h4 style={{marginBottom: 5}}>Максимальное значение</h4>
                            <input type="number" value={spec.max} onChange={(e) => edit(e.target.value, "max", idx)} />
                        </div>
                    )
                }
            </div>
        )
    }

    const nestedRender = (currentField, key, info) => {

        const addNestedField = (emptyNested) => {
            setFields({...fields, [key]: [...fields[key], emptyNested]})
        }

        const removeNestedField = (idx) => {
            fields[key].splice(idx,1);
            setFields({...fields})
        }

        const editNestedField = (value, field, idx) => {
            setFields({...fields, [key]: [...fields[key]].map((spec, specIdx) =>
                    (specIdx == idx) ? 
                    {...spec, [field]: value} :
                    {...spec}
                )
            })
        }

        if(info.nestedType == "spec")
            return specRender(currentField, addNestedField, removeNestedField, editNestedField)
        if(info.nestedType == "os")
            return osRender(currentField, addNestedField, removeNestedField, editNestedField)
        return <></>
    
    }

    const fieldRender = (currentField, key, info) => {
        if(info.type == "file") 
            return fileRender(currentField, key)
            
        if(info.type == "status")
            return statusRender(currentField, key, info)

        if(info.type == "textarea")
            return textareaRender(currentField, key)

        if(info.type == "date")
            return dateTimePicker(currentField, key, info, false)

        if(info.type == "datetime")
            return dateTimePicker(currentField, key, info, true)

        if(info.type == "nested")
            return nestedRender(currentField, key, info)

        if(info.type == "phone")
            return <InputMask mask="+7 999 999 99 99" maskChar=" " placeholder="Номер телефона" value={currentField} onChange={(e) => editedFieldsChange(e.target.value, key)} type="text"/>
        
        return (
                <input placeholder={info.placeholder} type={info.type} value={currentField} onChange={e => editedFieldsChange(e.target.value, key)}/>
        )
    }


    return(
        <div className={`raise-balance items-center display-flex direction-column ${active ? "open open-op" : ""}`} onClick={e => checkClickOutside(e)} id="modal-1">
            <div className="container items-center display-flex direction-column">
                <div ref={popupContent} className="for-raise-balance direction-column">
                    <div className="close-popup display-flex contet-space-b"><h1>{header}</h1><Icon id="close_popup" onClick={() => setActive(false)}/></div>

                      <form className="display-flex contet-space-b direction-column">
                        <div className="for-inputs display-flex direction-column">
                            {
                                Object.keys(fields).map((key, idx) => { // Выводим поля ввода
                                    
                                    return(
                                        key!="id" ? // Поле id не выводим, так как его не нужно менять
                                        <div className={`input_container ${(fields[key] === '' && fieldsForChangeInfo[key].reqired) ? "not_valid" : ""}`} key={key}>
                                            <h4 style={{marginBottom: 5}}>{fieldsForChangeInfo[key].placeholder}</h4>
                                            { fieldRender(fields[key], key, fieldsForChangeInfo[key]) }
                                        </div>
                                        :
                                        <></>
                                    )
                                })
                            }
                        </div>
                        <div className="for-inputs display-flex direction-column">
                            <h2>{checkValidFields() ? "" : "Пожалуйста, заполните все обязательные поля"}</h2>   
                            <Button type="submit" onClick={e => addOrEdit == "edit" ? onEdit(e) : onAdd(e)} >{addOrEdit == "edit" ? "Сохранить изменения" : "Добавить пользователя"}</Button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AdminFieldsPopup;