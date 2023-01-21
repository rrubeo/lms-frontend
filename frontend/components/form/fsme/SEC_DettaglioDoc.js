import * as React from "react";
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Image } from "mui-image";
import DCT_DownloadButton from "../../DCT_DownloadButton";
import jnStyles from "../../../styles/utils.module.css";

const fsme_cfg = require("./config");

class SEC_DettaglioDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.data.docPdf.idContenuto
        ? this.props.data.docPdf.testoImages
        : [],
      link: this.props.data.docPdf.idContenuto
        ? this.props.data.docPdf.urlFile
        : "",
      selectedImage: 0,
      imagePath: this.props.data.docPdf.idContenuto
        ? this.props.data.docPdf.testoImages[0].imagePath
        : null,
    };

    this.MasonryImageList = this.MasonryImageList.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  handleSelectImage(index, imagePath) {
    // console.log(index);
    this.setState({ selectedImage: index, imagePath: imagePath });
  }

  MasonryImageList(itemData) {
    return (
      <ImageList
        component="div"
        variant="masonry"
        cols={1}
        gap={2}
        sx={{ p: 2}}
      >
        {itemData.map((item, index) => (
          <ImageListItem
            key={item.thumbImagePath}
            onClick={(event) => this.handleSelectImage(index, item.imagePath)}
            sx={{
              cursor: "pointer",
              marginBottom: "0!important",
            }}
          >
            <img
              className={
                this.state.selectedImage == index
                  ? jnStyles.jnThumbs1
                  : jnStyles.jnThumbs0
              }
              src={`${item.thumbImagePath}?w=248&fit=crop&auto=format`}
              srcSet={`${item.thumbImagePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`Page ${index}`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  render() {
    // console.log(this.props);
    return (
      <>
        {this.props.data.docPdf.idContenuto ? (
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={{ xs: 0, sm: 0, md: 0 }}
            sx={{ pb: 12 }}
          >
            {this.MasonryImageList(this.state.list)}
            <Stack
              justifyContent="flex-start"
              alignItems="stretch"
              direction="column"
              spacing={0}
            >
              <Stack
                justifyContent="flex-start"
                alignItems="stretch"
                direction="row"
                spacing={0}
              >
                <DCT_DownloadButton
                  id="zoomIgm"
                  src={this.state.imagePath}
                  img="icon-zoom-in"
                />
                <DCT_DownloadButton
                  id="downPdf"
                  src={this.state.link}
                  img="icon-file-pdf"
                />
              </Stack>
              <Image width="100%" fit="scale-down" src={this.state.imagePath} />
            </Stack>
          </Stack>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default SEC_DettaglioDoc;
