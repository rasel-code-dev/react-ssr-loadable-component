import React from 'react'


const width = (WrapperComponent) => {
  return (props)=>{

    const [winScreenWidth, setWinScreenWidth] = React.useState(0);

    const [ screen, setScreen ] =  React.useState({ 
      xs: { min: 0, max: 575 }, 
      sm: { min: 576, max: 767 }, 
      md: { min: 768, max: 991 },  
      lg: { min: 992, max: 1200 },  
      xl: { min: 1200, max: null }, 
    })


    React.useEffect(() => {
      let innerWidth = window.innerWidth;
      setWinScreenWidth(innerWidth);
  
      window.addEventListener("resize", e => {
        innerWidth = e.target.innerWidth;
        setWinScreenWidth(innerWidth);
      });
  
      return () => {
        return window.removeEventListener("resize", d => {
          console.log(d);
        });
      };
    }, []);


    let winScreenSize = "";

    if( winScreenWidth > screen.xs.min && winScreenWidth < screen.xs.max)
      winScreenSize = "xs"
    if( winScreenWidth > screen.sm.mint && winScreenWidth < screen.sm.max)
      winScreenSize = "xs"
    if( winScreenWidth > screen.xs.min && winScreenWidth < screen.xs.max)
      winScreenSize = "sm"
    if( winScreenWidth > screen.md.min && winScreenWidth < screen.md.max)
      winScreenSize = "md"
    if( winScreenWidth > screen.lg.min && winScreenWidth < screen.lg.max)
      winScreenSize = "lg"
    if( winScreenWidth > screen.xl.min && winScreenWidth < screen.xl.max)
      winScreenSize = "xl"
    


    function isDown(size){
      for (const key in screen) {
        if(key === size){
          if(screen[key].max >= winScreenWidth){
            return true
          } else{
            return false
          }
        }
      }
    }

    function isUp(size){
      for (const key in screen) {
        if(key === size){
          if((screen[key].max + 1) <= winScreenWidth){
            return true
            
          } else{
            return false
          }
        }
      }
    }

    return <WrapperComponent isUp={isUp} isDown={isDown} win_screen_size={winScreenSize} win_screen_width={winScreenWidth}  {...props}/> 
  }
}

export default width
