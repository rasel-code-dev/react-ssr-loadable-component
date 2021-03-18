import React from "react";
import api from '../../../apis/api'

import classnames from "classnames";

import "./File.scss";

import Avatar from "../../Avatar/Avatar";


const File = props => {
  const { image, multiple, name, onChange, label, theme } = props;

  const [isFocused, setFocus] = React.useState(false);
  const [value, setValue] = React.useState(false);
  const [FileList, setFileList] = React.useState([]);

  const [dataURI, setDataURI] = React.useState( multiple ? [] : '' );

  const input = React.createRef();
  let file = React.createRef();

  if (image) {
    let type = "file";
  }

  let inputFile;


  function handleChange(e) {  
    inputFile = e.target

    if(multiple){
      setFileList(Array.from(e.target.files))
      
      // multiple image.............
      let uris = []
      let totalLength = e.target.files.length

      function stateChangeFunc(callback){
        for (let i=0; i<e.target.files.length; i++){
          let file = e.target.files[i]
          let reader = new FileReader();
          reader.onload = function(e) {
            uris.push({data: e.target.result, name: file.name})
            callback()
          };
          reader.readAsDataURL(file);
        }
      }

      let frist = 0;
      
      stateChangeFunc(()=>{
        // only second last execute.................      
        frist = frist + 1
        if(frist ===  totalLength ){
          setDataURI(uris)          
          if(inputFile){
            onChange(inputFile.name, inputFile.files)
          }
        }
      })


    } else {
      // single Image...........
      let file = e.target.files[0];
      if(file){
        onChange(inputFile.name, file)
        
        fileReader(file)
        .then(data=>{
          setDataURI(data);
          setFocus(true);
        })
      };
    }   
  }


  function delete_Individual_File(name){
    if(file){
      // remove from state...
      let updatedState = [...dataURI]
      let indexState = updatedState.findIndex(f=>f.name == name)
      updatedState.splice(indexState, 1)
      setDataURI(updatedState)

      // remove from file List Array....
      let updatedFileList = [...FileList]
      let index = updatedFileList.findIndex(f=>f.name == name)
      updatedFileList.splice(index, 1)
      setFileList(updatedFileList);

      onChange(file.current.name, updatedFileList)
    }
  }
  
  function fileReader(file){
    return new Promise((resolve, reject)=>{
    let reader = new FileReader();
    reader.onload = function(e) {
      resolve(e.target.result)
    };
      reader.readAsDataURL(file);
    })
  }
  

  function showInputHandler(e){
    setFocus(true);
  
    if(file){
      file.current.click()
    }

  }

  const handleBlur = e => {
    if (input) {
      if (!input.current.value) {
        setFocus(false);
      }
    }
  };

  function handleClearImage(e){
    setDataURI('')
    file.current.value = ''
  }


  let groupClasses = classnames("input_group file", theme && `input_group_${theme}`);

  return (
    <div className="form_control_file">
      
      <div  className={groupClasses}>
        <label className={[isFocused || value ? "expand_label" : "collapse_label"].join(" ")} htmlFor={name}> {label} </label>

        <div className="input_wrapper">

        <div className="preview_image">
          { multiple ?
           dataURI && dataURI.map((data, i)=> (
              <div key={i} className="image_wrapper">
                <Avatar size={100} src={data.data} /> 
                <div onClick={(e)=>delete_Individual_File(data.name)} className="clear_button">
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                </div>
              </div>
            ))  : (
              <div className="image_wrapper">
                <Avatar size={100} src={dataURI} /> 
                <div onClick={handleClearImage} className="clear_button">
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                </div>
              </div>
            )
         }

        </div>


          <div onClick={showInputHandler} className="file_choose_button" >Choose</div>

          <input
            ref={file}
            type="file"
            name={name}
            multiple={multiple ? true : false}
            onChange={handleChange}
            className="input_file"
          />
        </div>
      </div>
    </div>
  );
};







export default File;
