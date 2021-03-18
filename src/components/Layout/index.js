import Row from "./Row/Row";
import Col from "./Col/Col";
import Box from "./Box/Box";
import Container from "./Container/Container";
import Hidden from "./Hidden/Hidden";
import withWidth from "./withWidth/withWidth";

export { Container, Row, Col, Box, Hidden, withWidth  }
    
// Read Documention

//   `export default class App extends React.Component{
//   render(){
//     return (
//       <Container fluid>
//         <Row spacing={3} >
//           <Col sm={6} xs={12}> <div className="paper">Z</div></Col>
//           <Col sm={6} xs={12}> <div className="paper">B</div></Col>
//         </Row>
//         <Box mx={-15} mt={50} justify="center" className="paper">
//           <Box alignSelf='center'>Hi</Box>
//         </Box>
//       </Container>
//     )
//   }
// }`;

/*
!!! Container
      --> container
fluid --> container-fluid
full --> container-full (no padding)
m, mt, mx, m={{t: '', b: '', l: '', r:''}}
p-->number, pt-->number, px-->number, p={t: '', b: '', l: '', r:''}
d --> string --> block --> class(d-block)
tag --> string
textAlign --> string --> class(text-align-center)
justify --> string --> class(justify-content-center)
alignItems --> string --> class(align-items-center)
alignContent --> string --> class(align-content-center)
alignSelf --> string --> class(align-self-center)


!!! Row
m, mt, mx, m={{t: '', b: '', l: '', r:''}}
p-->number, pt-->number, px-->number, p={t: '', b: '', l: '', r:''}
d --> string --> block --> class(d-block)
tag --> string
textAlign --> string --> class(text-align-center)
justify --> string --> class(justify-content-center)
alignItems --> string --> class(align-items-center)
alignContent --> string --> class(align-content-center)
alignSelf --> string --> class(align-self-center)
spacing: number enum[0, 1, 2, 3, 4 , 5], 
ref=col -> col-inline- (width) reduce and row-gutter-1

colPadding --> col-spacing-4 = padding: 4px
colPaddingX --> left right
colPaddingY --> y cordinate
direction: string --> class(direction-row)

!!! Col
size: number --> class(col-1),
xs: number --> class(col-1),
sm: number --> class(col-sm-1),
md: number --> class(col-md-1),
lg: number --> class(col-lg-1),
xl: number --> class(col-xl-1),

m, mt, mx, m={{t: '', b: '', l: '', r:''}}
p-->number, pt-->number, px-->number, p={t: '', b: '', l: '', r:''}
d --> string --> block --> class(d-block)
tag --> string
textAlign --> string --> class(text-align-center)
justify --> string --> class(justify-content-center)
alignItems --> string --> class(align-items-center)
alignContent --> string --> class(align-content-center)
alignSelf --> string --> class(align-self-center)



!!! Box
m, mt, mx, m={{t: '', b: '', l: '', r:''}}
p-->number, pt-->number, px-->number, p={t: '', b: '', l: '', r:''}
d --> string --> block --> class(d-block)
tag --> string
textAlign --> string --> class(text-align-center)
justify --> string --> class(justify-content-center)
alignItems --> string --> class(align-items-center)
alignContent --> string --> class(align-content-center)
alignSelf --> string --> class(align-self-center)


*/

// align content container property.
// it align within extra white space. inside container.
// it need container --> property display flex.

// alignItems="center" -->   align-items-center
// alingContent="center" --> align-content-center
// justify="center"    -->   justify-content-center
// tag='div'
// spacing --> (each col element padding) 0 = 1, 1 = 4, 2 = 8 px max 5 = 20px



//........... 
// withWidth  isDown(sm)  means  767px to 0px ( not tauched sm max range )
// withWidth  isUp(sm)  means  768px to 000000px  (not tauched sm min range)

