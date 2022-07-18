import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import fsStyle from "../../../styles/Fs.module.css";
import jnStyles from "../../../styles/utils.module.css";

class FS_List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : ' ',
      list: this.props.array ? this.props.array : [{name: "Nessuna lezione recente"}],
      background: this.props.background ? this.props.background : null,
      padding: this.props.type == "avatar" ? '0!important' : null,
    };
  }

  render() {
    const itemData = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      },
      {
        id: 6
      }
    ]


    function openImage(){
      console.log("OK")
    }


    return (
      <Container disableGutters maxWidth="false" sx={{display: 'flex', alignItems: 'center', marginTop: '5%'}}>
        <Container sx={{width: '5%', paddingLeft: '0!important', paddingRight: '0!important', textAlign: 'center'}}>
          <Typography
            variant="h4"
            className="icon-arrow-left3"
            sx={{ color: "#000000", fontSize: '20px', display: 'inline', cursor: 'pointer' }}
          ></Typography> 
        </Container> 

        <Container sx={{width: '90%'}}>
          <ImageList cols={5} variant="masonry" sx={{height: '150px', overflowY: 'hidden', overflowX: 'hidden'}}>
            {itemData.map((item) => (
              <ImageListItem key={item.id} sx={{height: 'inherit!important', marginBottom: '0!important', cursor: 'pointer'}}>
                <img
                  src={'../images/bkg_pattern.png'}
                  loading="lazy"
                  onClick={openImage}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>  

        <Container sx={{width: '5%', paddingLeft: '0!important', paddingRight: '0!important', textAlign: 'center'}}>
          <Typography
            variant="h4"
            className="icon-arrow-right3"
            sx={{ color: "#000000", fontSize: '20px', display: 'inline', cursor: 'pointer' }}
          ></Typography> 
        </Container>  
      </Container>
    );
  }
}

export default FS_List;
