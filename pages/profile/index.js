import PageContainer from "../../components/Assets/PageContainer";
import InputMask from 'react-input-mask';
import { useState, useEffect } from 'react'

const testData = {
  firstName: "Александр",
  middleName: "Юрьевич",
  lastName: "Мандрыкин",
  email: "aleksMandr@ya.ru",
  phone: "+79999999999",
}


const Profile = (props) => {

  const [formData, setFormData] = useState([])
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [warning, setWarning] = useState(null)

  useEffect(() => {
    const getServices = async() => {
      await setTimeout( () => { 
        setFormData(testData)
      }, 1000)
    }

    getServices()
  }, [])

  const updateFormData = (key, value) => {
    setFormData({...formData, [key]: value});
  }

  const checkPassword = () => {
    if(password != confirmPassword)
      setWarning("Пароли не совпадают")
    else
      setWarning(null)
  }

  const formSubmit = (e) => {
    e.preventDefault()
    checkPassword()
  }

  return (
    <PageContainer>
        <div className="raise-balance setting-profile items-center display-flex direction-column">
          <form className="for-raise-balance for-setting-profile direction-column">
            <h1>Настройки профиля</h1>
            <div className="parametrs-balance display-flex contet-space-b">
              <div className="for-inputs display-flex direction-column">
                <input placeholder="Имя" value={formData.firstName} onChange={(e) => updateFormData("firstName", e.target.value)} type="text"/>
                <input placeholder="Фамилия" value={formData.middleName} onChange={(e) => updateFormData("middleName", e.target.value)} type="text"/>
                <input placeholder="Отчество" value={formData.lastName} onChange={(e) => updateFormData("lastName", e.target.value)} type="text"/>
                <input placeholder="Почта" value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} type="email"/>                          
              </div>
              <div className="for-inputs display-flex direction-column">
                <InputMask mask="+7 999 999 99 99" maskChar=" " placeholder="Номер телефона" value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} type="text"/>
                <input className="password" placeholder="Текущий пароль" type="password"/>
                <input className="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Новый пароль" type="password"/>
                <input className="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Подтвердите новый пароль" type="password"/>
                <input className="confirmation-password" placeholder="Подтверждение пароля" type="password"/>
              </div>
              <div className="for-inputs display-flex direction-column">
                <button type="submit" onClick={(e) => formSubmit(e)}>Подтвердить изменения</button>
                <p style={{color: "#E01F3D", marginTop: 5+"px"}}>{warning}</p>
              </div>
            </div>
          </form>
        </div>
    </PageContainer>
  )
};

export default Profile;