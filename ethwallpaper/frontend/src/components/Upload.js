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
    authorEmail: '',
    logoSize: 'normal',
    file: null,
    formValidator: {
      title: true,
      author: true,
      author_email: true,
    },
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
      authorEmail: '',
      logoSize: 'normal',
      file: null,
      formValidator: {
        title: true,
        author: true,
        author_email: true,
      },
    });
  }

  handleChange = (event, logoSize) => {
    this.setState({ logoSize });
  };

  handleUpload() {
    if (this.props.open && this.props.upload.fetched) {
      this.props.dispatch(uploadFinish());
      this.props.onClose();
      this.resetState();
    } else {
      const validatorState = this.state.formValidator;
      if (validatorState.author && validatorState.author_email && validatorState.title) {
        this.props.dispatch(uploadWallpaper(this.state));
      }
    }
  }

  handleTextChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  validate = event => {
    const validatorState = this.state.formValidator;
    validatorState[event.target.id] = event.target.value.trim().length > 0;

    const expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (event.target.id === 'author_email' && !expr.test(event.target.value)) {
      validatorState[event.target.id] = false;
    }

    this.setState({ formValidator: validatorState });
  };

  render() {
    const { upload } = this.props;
    const { formValidator } = this.state;

    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle className="dialog-title">
          Upload Wallpaper
          {upload.fetching && <LinearProgress />}
        </DialogTitle>
        <DialogContent>
          <div hidden={upload.fetched}>
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

            <div className="text-fileds">
              <TextField
                autoFocus
                className="form-field"
                id="title"
                label="Title*"
                onChange={this.handleTextChange('title')}
                onBlur={this.validate.bind(this)}
                type="text"
                margin="normal"
                error={!formValidator.title}
                fullWidth
              />

              <TextField
                className="form-field"
                id="author"
                label="Author*"
                onChange={this.handleTextChange('author')}
                onBlur={this.validate.bind(this)}
                type="text"
                error={!formValidator.author}
                fullWidth
              />

              <TextField
                className="form-field"
                id="author_email"
                label="Author Email*"
                onChange={this.handleTextChange('author_email')}
                onBlur={this.validate.bind(this)}
                type="email"
                helperText="Used to send you a link when your image is done processing. We'll never sell your email address"
                margin="normal"
                error={!formValidator.author_email}
                fullWidth
              />

              <TextField
                className="form-field"
                id="tags"
                label="Tags"
                onChange={this.handleTextChange('tags')}
                type="text"
                fullWidth
              />
            </div>
            <div className="size-fields">
              <div>Size of Ethereum logo</div>
              <RadioGroup
                className="radio-group"
                aria-label="Size"
                name="size"
                value={this.state.logoSize}
                onChange={this.handleChange}
              >
                <FormControlLabel value="small" control={<Radio />} label="Small" />

                <FormControlLabel value="normal" control={<Radio />} label="Normal" />

                <FormControlLabel value="large" control={<Radio />} label="Large" />
              </RadioGroup>
            </div>
          </div>
          <div hidden={!upload.fetched}>
            <h5> Your wallpaper has been uploaded successfully!</h5>
            <div>It is queued for processing and you will receive email notification when ready!</div>
          </div>
        </DialogContent>
        <DialogActions>
          <div hidden={upload.fetched}>
            <Button onClick={this.props.onClose}>
              Cancel
          </Button>
          </div>
          <Button disabled={upload.fetching} onClick={this.handleUpload.bind(this)} color="primary">
            {upload.fetched ? 'OK' : 'Upload'}
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
