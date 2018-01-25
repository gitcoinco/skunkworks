import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import { LinearProgress } from 'material-ui/Progress';

import { SwiperGallery } from './SwiperGallery';

import { uploadWallpaper, uploadFinish } from '../actions/wallpapers';

import './Upload.css';


class Upload extends React.Component {
  state = {
    description: '',
    authorEmail: '',
    logoSize: 'normal',
    files: [],
    formValidator: {
      description: true
    },
  };

  onDrop(files) {
    if (files.length > 10) {
      files = files.slice(0, 10);
    }

    this.setState({
      files: files
    });
  }

  resetState() {
    this.setState({
      description: '',
      authorEmail: '',
      logoSize: 'normal',
      files: [],
      formValidator: {
        description: true
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
      if (validatorState.description && validatorState.author_email) {
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

    const expr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (event.target.id === 'author_email' && !expr.test(event.target.value)) {
      validatorState[event.target.id] = false;
    }

    this.setState({ formValidator: validatorState });
  };

  handleClose() {
    this.props.onClose();
    this.resetState();
  }

  render() {
    const { upload } = this.props;
    const { formValidator } = this.state;

    return (
      <Dialog open={this.props.open} onClose={this.handleClose.bind(this)}>
        <DialogTitle className="dialog-title">
          Upload Wallpapers <br />
          <span className="helper-text" hidden={upload.fetched}>
            Upload upto 10 images. Each image must be jpg, png, gif format and less than 5 MB
          </span>
          {upload.fetching && <LinearProgress />}
        </DialogTitle>

        <DialogContent>
          <div hidden={upload.fetched}>
            {this.state.files.length > 0 && (<SwiperGallery images={this.state.files} />)}

            <Dropzone accept="image/jpeg, image/png, image/gif" className="upload-form"
                      onDrop={this.onDrop.bind(this)}
                      multiple={true} maxSize={5242880}
                      hidden={this.state.files.length > 0}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>

            <div className="text-fields">
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
                  id="description"
                  label="Description*"
                  multiline
                  rowsMax="8"
                  onChange={this.handleTextChange('description')}
                  onBlur={this.validate.bind(this)}
                  helperText="Used for search functionality on ethwallpaper.co"
                  margin="normal"
                  error={!formValidator.description}
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
            <h5> Your wallpaper(s) has been uploaded successfully!</h5>
            <div>It is queued for processing and you will receive email notification when ready!</div>
          </div>
        </DialogContent>
        <DialogActions>
          <div hidden={upload.fetched}>
            <Button onClick={this.handleClose.bind(this)}>
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
