import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

class FS_List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.array ? this.props.array : [],
    };
  }

  render() {
    function getBorderCss(index, itemId){
      var style = '';
      if (itemId == index){
        style = {border: '2px solid #B34B9E'}
      } else {
        style = {border: '2px solid #000000'}
      }

      return style;
    }

    return (
      <Container disableGutters maxWidth="false" sx={{display: 'flex', alignItems: 'center', marginTop: '5%'}}>
        <Container sx={{width: '100%'}} maxWidth="false">
          <ImageList cols={5} variant="masonry" sx={{height: '150px', overflowY: 'hidden'}}>
            {this.state.list.map((item) => (
              <ImageListItem key={item.id} sx={{height: 'inherit!important', marginBottom: '0!important', cursor: 'pointer'}}>
                {
                  <img
                    style= {getBorderCss(this.props.index, item.id)}
                    id={"imgCarousel"+item.id}
                    src={item.images.thumbImagePath}
                    loading="lazy"
                    onClick={event => this.props.onClickFunction(item.id)}
                  />
                } 
              </ImageListItem>
            ))}
          </ImageList>
        </Container>  
      </Container>
    );
  }
}

export default FS_List;
