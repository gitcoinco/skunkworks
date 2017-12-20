import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Dropzone from 'react-dropzone';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import { LinearProgress } from 'material-ui/Progress';

import { uploadWallpaper, uploadFinish } from '../actions/wallpapers';

import './Upload.css';

class Upload extends React.Component {
  state = {
    title: '',
    author: '',
    logoSize: 'normal',
    open: false,
    file: null,
  };

  onDrop(files) {
    this.setState({
      file: files[0],
    });
  }

  resetState() {
    this.setState({
      title: '',
      author: '',
      logoSize: 'normal',
      open: false,
      file: null,
    });
  }

  handleUploadSuccess = id => {
    this.resetState();
    this.props.dispatch(uploadFinish());
    this.props.dispatch(push(`/preview/${id}`));
  };

  handleChange = (event, logoSize) => {
    this.setState({ logoSize });
  };

  handleUpload() {
    this.props.dispatch(uploadWallpaper(this.state));
  }

  handleUploadModal = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.props.open = false;
  };

  handleTextChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { upload } = this.props;
    if (this.props.open && upload.fetched) {
      this.handleUploadSuccess(upload.payload.id);
    }
  }

  render() {
    const { upload } = this.props;
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Upload Wallpaper</DialogTitle>
        <DialogContent>
          {upload.fetching && <LinearProgress />}

          {this.state.file && (
            <div className="upload-preview">
              <img src={this.state.file.preview} alt="preview" />
            </div>
          )}

          {this.state.file === null && (
            <Dropzone accept="image/jpeg, image/png" className="upload-form" onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          )}

          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            onChange={this.handleTextChange('title')}
            type="text"
            fullWidth
          />

          <TextField
            margin="dense"
            id="author"
            label="Author"
            onChange={this.handleTextChange('author')}
            type="text"
            fullWidth
          />

          <TextField
            margin="dense"
            id="tags"
            label="Tags"
            onChange={this.handleTextChange('tags')}
            type="text"
            fullWidth
          />

          <div>
            <RadioGroup aria-label="Size" name="size" value={this.state.logoSize} onChange={this.handleChange}>
              <FormControlLabel value="small" control={<Radio />} label="Small" />
              <FormControlLabel value="normal" control={<Radio />} label="Normal" />
              <FormControlLabel value="large" control={<Radio />} label="Large" />
            </RadioGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button onClick={this.handleUpload.bind(this)} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    upload: state.upload,
  };
};
export default connect(mapStateToProps)(Upload);
