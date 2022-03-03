import {useState, useRef, useEffect} from 'react';

const UploadFile = ({setFile, fileState, multiple}) => {
  const FileInput = useRef(null);
  const [inputValidate, setInputValidate] = useState({filename: false, isValid: true});

  useEffect(() => {
    if(fileState.length == 0) {
      setInputValidate({...inputValidate, filename: false});
      FileInput.current.value = null;
    }
  }, [fileState])

  function isImage(file) {
    if(file.type.split('/')[0] == "image" && file.size <= 10485760) {
      inputValidate.isValid = true;
      return true;
    }else {
      inputValidate.isValid = false;
      return false;
    }
  }

  const resetInput = () => {
    setFile([]);
    setInputValidate({...inputValidate, filename: false});
  }

  const uploadFile = async (e) => {
    const files = [...e.target.files];
    if( files.length > 0 ) {
      let base64Files = await Promise.all([...files].map( async (file, idx) => {
            if( isImage(file) ) {
              setInputValidate({...inputValidate, filename: file.name});
              return await convertBase64(file)
            }
          }))
      base64Files.length != 0 ? setFile(base64Files) : resetInput();
    } else {
      inputValidate.isValid = true
      resetInput()
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = () => {
        resolve("");
      };
    });
  };

  function getFile() {
    FileInput.current.click();
  }

  return (
    <div className="display-flex add-photo-container">
      <div className={`add-photo display-flex ${inputValidate.isValid ? "" : "wrong-type"}`} onClick={getFile}>
        <input ref={FileInput} type="file" multiple={multiple} onChange={(e) => {uploadFile(e);} } style={{display: "none"}} />
        {
          inputValidate.filename ? <p>{inputValidate.filename}</p> : <img src="/assets/img/add_photo.svg"/>
        }
      </div>
    </div>
  )

}

export default UploadFile;