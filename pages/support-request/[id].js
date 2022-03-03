import { useState, useEffect } from 'react';
import PageContainer from "../../components/Assets/PageContainer";
import StatusBar from '../../components/Assets/StatusBar';
import { GlobalUserProvider, GlobalUserContext, useUserData } from "../../components/Context/GlobalUserContext";
import UploadFile from '../../components/Assets/UploadFile';
import FullImgView from '../../components/Assets/FullImgView';

export default function SupportRequest(props) {

  const [userData] = useUserData();
  const [request, setRequest] = useState(props.request);
  const [newMessage, setNewMessage] = useState("");
  const [newFiles, setNewFiles] = useState([]);

  function dateToString(dateInNumber, needTimeVal) {
    let date = new Date(Number(dateInNumber));
    if(needTimeVal) 
      return date.toLocaleDateString('ru-RU') + " " + date.getHours() + ":" + date.getMinutes();
    else
    return date.toLocaleDateString('ru-RU');
  }

  const setFile = (base64) => {
    setNewFiles([...base64])
  }

  const sendMessage = () => {
    if(newMessage != "" || newFiles.length > 0) {
      setRequest({
        ...request,
        messages: [
          ...request.messages,
          {
            author: "user",
            message: newMessage,
            files: newFiles,
            date: new Date().getTime()
          }
        ],
      })
      setNewMessage("");
      setNewFiles([]);
    }
  }

  return (
    <PageContainer>
      <div className="container items-center display-flex direction-column">
        <section className="service request display-flex direction-column">
                <div className="tittle-request display-flex contet-space-b">
                    <div className="items-center display-flex"><StatusBar status={request.status}/><h2>{request.topic}</h2></div>
                    <div className="items-center display-flex"><h2><span>{request.machine}</span></h2>
                        <h2><span><img src="/assets/img/calendary.svg" className="img-user"/>{dateToString(request.openingDate, false)}</span></h2>
                    </div>
                </div>
                {
                  request.messages.map((message) => 
                    <div className="for-request display-flex" key={message.date}>
                        <div className="for-user-logo-1 display-flex"><img src={userData[message.author].avatar}/></div>
                        <div className="text-request display-flex direction-column"><h2>{userData[message.author].name}</h2>
                            <h2><span className="text-request-span">{message.message}</span></h2>
                            {
                              message.files.map((file) => {
                                  let img = new Image()
                                  img.src = file

                                return (
                                  <FullImgView img={file} width={img.width} ><img style={{width: img.width, maxWidth: 300}} src={file}/></FullImgView>
                                )
                              }
                              )
                            }
                            <h2><span className="date-request">{dateToString(message.date, true)}</span></h2>
                        </div>
                    </div>
                  )
                }
                {
                  request.status == 3 ?
                    <textarea className="request-advice" placeholder="Данная тема закрыта" disabled/>
                  :
                  <>
                    <textarea className="request-advice" onChange={e => setNewMessage(e.target.value)} value={newMessage} placeholder="Напишите сообщение..."/>
                    <div className="display-flex items-start">
                        <button className="button ask-quastion" onClick={() => sendMessage()}>Отправить сообщение</button>
                        {
                          newFiles.map((newFile, idx) =>
                            <div className='send_preview_container' key={idx+newFile[0]}>
                              <img src={newFile}/>
                            </div>
                          )
                        }
                        <UploadFile setFile={setFile} fileState={newFiles} multiple={true}/>
                        
                    </div>
                    <button className="button ask-quastion close-request" onClick={() => setRequest({...request, status: 3})}>Закрыть обращение</button>
                  </>
                }
                
        </section>
      </div>
    </PageContainer>
  )
}

export async function getServerSideProps({params}) {
  const request = {
    id: params.id,
    status: 1,
    topic: "Не работают сервера",
    machine: "Виртуальный сервер №312321",
    openingDate: 1638378000000,
    messages: [
      {
        author: "user",
        message: "Не работают сервера",
        files: [],
        date: 1636554480000
      },
      {
        author: "admin",
        message: "Сочувствую Вам",
        files: [],
        date: 1636554480005
      },
      
    ]
  };

  return {
    props: {request}, // will be passed to the page component as props
  }
}